import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationStatus, Prisma, ServiceAdStatus, UserRole } from '@prisma/client';
import { optionalFutureDate } from '../../common/utils/date';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateServiceAdDto } from './dto/create-service-ad.dto';
import { ServiceAdQueryDto } from './dto/service-ad-query.dto';
import { UpdateServiceAdDto } from './dto/update-service-ad.dto';

const adInclude = {
  category: true,
  categories: { include: { category: true } },
  images: true,
  client: { include: { user: { select: { id: true, name: true, phone: true, avatarUrl: true } } } },
  applications: {
    include: {
      professional: {
        include: {
          user: { select: { id: true, name: true, phone: true, avatarUrl: true } },
          specialties: { include: { category: true } },
        },
      },
    },
  },
} satisfies Prisma.ServiceAdInclude;

@Injectable()
export class ServiceAdsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateServiceAdDto) {
    const client = await this.ensureClientProfile(userId);
    const categoryIds = this.normalizeCategoryIds(dto.categoryId, dto.categoryIds);
    const [primaryCategoryId] = categoryIds;

    return this.prisma.serviceAd.create({
      data: {
        clientId: client.id,
        categoryId: primaryCategoryId,
        title: dto.title,
        description: dto.description,
        location: dto.location,
        startDate: optionalFutureDate(dto.startDate),
        startTime: dto.startTime,
        deadlineDays: dto.deadlineDays,
        budget: dto.budget,
        negotiable: dto.negotiable ?? true,
        images: dto.imageUrls?.length
          ? { create: dto.imageUrls.map((url) => ({ url })) }
          : undefined,
        categories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
      },
      include: adInclude,
    });
  }

  findMine(userId: string, query: ServiceAdQueryDto) {
    return this.findMany(query, { client: { userId } });
  }

  async mySummary(userId: string) {
    const [openAds, receivedApplications] = await this.prisma.$transaction([
      this.prisma.serviceAd.count({
        where: { client: { userId }, status: ServiceAdStatus.OPEN },
      }),
      this.prisma.application.count({
        where: {
          status: { in: [ApplicationStatus.SENT, ApplicationStatus.COUNTER_OFFERED] },
          ad: { client: { userId }, status: ServiceAdStatus.OPEN },
        },
      }),
    ]);

    return { openAds, receivedApplications };
  }

  async findOpen(userId: string, query: ServiceAdQueryDto) {
    const professional = await this.prisma.professionalProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        specialties: { select: { categoryId: true } },
      },
    });

    const categoryIds = professional?.specialties.map((specialty) => specialty.categoryId) ?? [];
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    if (!professional || categoryIds.length === 0) {
      return { items: [], total: 0, page, limit };
    }

    return this.findMany(
      { ...query, status: ServiceAdStatus.OPEN },
      {
        client: { userId: { not: userId } },
        applications: { none: { professionalId: professional.id } },
        OR: [
          { categoryId: { in: categoryIds } },
          { categories: { some: { categoryId: { in: categoryIds } } } },
        ],
      },
    );
  }

  async findOne(id: string) {
    const ad = await this.prisma.serviceAd.findUnique({
      where: { id },
      include: adInclude,
    });

    if (!ad) {
      throw new NotFoundException('Anuncio nao encontrado.');
    }

    return ad;
  }

  async update(userId: string, id: string, dto: UpdateServiceAdDto) {
    await this.assertOwnsAd(userId, id);
    const shouldUpdateCategories = dto.categoryId !== undefined || dto.categoryIds !== undefined;
    const categoryIds = shouldUpdateCategories
      ? this.normalizeCategoryIds(dto.categoryId, dto.categoryIds)
      : undefined;

    if (dto.imageUrls) {
      await this.prisma.serviceAdImage.deleteMany({ where: { adId: id } });
    }

    return this.prisma.serviceAd.update({
      where: { id },
      data: {
        categoryId: categoryIds?.[0],
        title: dto.title,
        description: dto.description,
        location: dto.location,
        startDate: optionalFutureDate(dto.startDate),
        startTime: dto.startTime,
        deadlineDays: dto.deadlineDays,
        budget: dto.budget,
        negotiable: dto.negotiable,
        images: dto.imageUrls
          ? { create: dto.imageUrls.map((url) => ({ url })) }
          : undefined,
        categories: categoryIds
          ? {
              deleteMany: {},
              create: categoryIds.map((categoryId) => ({ categoryId })),
            }
          : undefined,
      },
      include: adInclude,
    });
  }

  async updateStatus(userId: string, id: string, status: ServiceAdStatus) {
    await this.assertOwnsAd(userId, id);
    return this.prisma.serviceAd.update({
      where: { id },
      data: { status },
      include: adInclude,
    });
  }

  async remove(userId: string, id: string) {
    await this.assertOwnsAd(userId, id);
    await this.prisma.serviceAd.update({
      where: { id },
      data: { status: ServiceAdStatus.CANCELED },
    });
    return { deleted: true };
  }

  async dismiss(userId: string, id: string) {
    const professional = await this.prisma.professionalProfile.findUnique({
      where: { userId },
    });

    if (!professional) {
      throw new ForbiddenException('Perfil profissional nao cadastrado.');
    }

    const ad = await this.prisma.serviceAd.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!ad || ad.status !== ServiceAdStatus.OPEN) {
      throw new NotFoundException('Anuncio aberto nao encontrado.');
    }

    if (ad.client.userId === userId) {
      throw new BadRequestException('Voce nao pode recusar seu proprio anuncio.');
    }

    await this.prisma.application.upsert({
      where: {
        adId_professionalId: {
          adId: id,
          professionalId: professional.id,
        },
      },
      create: {
        adId: id,
        professionalId: professional.id,
        status: ApplicationStatus.CANCELED,
      },
      update: { status: ApplicationStatus.CANCELED },
    });

    return { dismissed: true };
  }

  private async findMany(query: ServiceAdQueryDto, extraWhere: Prisma.ServiceAdWhereInput = {}) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const filters: Prisma.ServiceAdWhereInput[] = [];

    if (query.categoryId) {
      filters.push({
        OR: [
          { categoryId: query.categoryId },
          { categories: { some: { categoryId: query.categoryId } } },
        ],
      });
    }

    if (query.q) {
      filters.push({
        OR: [
          { title: { contains: query.q } },
          { description: { contains: query.q } },
          { location: { contains: query.q } },
        ],
      });
    }

    const where: Prisma.ServiceAdWhereInput = {
      ...extraWhere,
      ...(query.status ? { status: query.status } : {}),
      ...(filters.length ? { AND: filters } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.serviceAd.findMany({
        where,
        include: adInclude,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.serviceAd.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  private normalizeCategoryIds(categoryId?: string, categoryIds: string[] = []) {
    const ids = [categoryId, ...categoryIds]
      .map((id) => id?.trim())
      .filter((id): id is string => Boolean(id));
    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length === 0) {
      throw new BadRequestException('Selecione ao menos uma categoria.');
    }

    return uniqueIds;
  }

  private async ensureClientProfile(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.CLIENTE },
    });

    return this.prisma.clientProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  }

  private async assertOwnsAd(userId: string, adId: string) {
    const ad = await this.prisma.serviceAd.findUnique({
      where: { id: adId },
      include: { client: true },
    });

    if (!ad) {
      throw new NotFoundException('Anuncio nao encontrado.');
    }

    if (ad.client.userId !== userId) {
      throw new ForbiddenException('Anuncio pertence a outro cliente.');
    }

    return ad;
  }
}
