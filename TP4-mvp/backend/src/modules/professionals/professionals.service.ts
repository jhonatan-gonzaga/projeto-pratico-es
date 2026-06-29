import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePortfolioProjectDto } from './dto/create-portfolio-project.dto';
import { SearchProfessionalsQueryDto } from './dto/search-professionals-query.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio-project.dto';
import { UpsertProfessionalProfileDto } from './dto/upsert-professional-profile.dto';

const professionalInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatarUrl: true,
      role: true,
    },
  },
  address: true,
  specialties: { include: { category: true } },
  availability: true,
  portfolio: { include: { images: true } },
} satisfies Prisma.ProfessionalProfileInclude;

const professionalWithReviewsInclude = {
  ...professionalInclude,
  reviews: {
    include: {
      client: { include: { user: { select: { id: true, name: true } } } },
    },
    orderBy: { createdAt: 'desc' as const },
  },
} satisfies Prisma.ProfessionalProfileInclude;

@Injectable()
export class ProfessionalsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: SearchProfessionalsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where: Prisma.ProfessionalProfileWhereInput = {
      ...(query.q
        ? {
            OR: [
              { user: { name: { contains: query.q } } },
              { about: { contains: query.q } },
              { specialties: { some: { category: { name: { contains: query.q } } } } },
            ],
          }
        : {}),
      ...(query.categoryId
        ? { specialties: { some: { categoryId: query.categoryId } } }
        : {}),
      ...(query.minPrice || query.maxPrice
        ? {
            dailyRate: {
              ...(query.minPrice ? { gte: query.minPrice } : {}),
              ...(query.maxPrice ? { lte: query.maxPrice } : {}),
            },
          }
        : {}),
      ...(query.minRating ? { ratingAvg: { gte: query.minRating } } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.professionalProfile.findMany({
        where,
        include: professionalInclude,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ ratingAvg: 'desc' }, { createdAt: 'desc' }],
      }),
      this.prisma.professionalProfile.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const professional = await this.prisma.professionalProfile.findUnique({
      where: { id },
      include: professionalWithReviewsInclude,
    });

    if (!professional) {
      throw new NotFoundException('Profissional nao encontrado.');
    }

    return professional;
  }

  async upsertMe(userId: string, dto: UpsertProfessionalProfileDto) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.PROFISSIONAL, avatarUrl: dto.profilePhotoUrl },
    });

    const profile = await this.prisma.professionalProfile.upsert({
      where: { userId },
      create: {
        userId,
        about: dto.about,
        dailyRate: dto.dailyRate,
      },
      update: {
        about: dto.about,
        dailyRate: dto.dailyRate,
      },
    });

    if (dto.address) {
      await this.prisma.address.upsert({
        where: { professionalProfileId: profile.id },
        create: { professionalProfileId: profile.id, ...dto.address },
        update: dto.address,
      });
    }

    if (dto.categoryIds) {
      await this.prisma.professionalSpecialty.deleteMany({
        where: { professionalId: profile.id },
      });
      await this.prisma.professionalSpecialty.createMany({
        data: dto.categoryIds.map((categoryId) => ({
          professionalId: profile.id,
          categoryId,
        })),
        skipDuplicates: true,
      });
    }

    if (dto.availability) {
      await this.prisma.professionalAvailability.deleteMany({
        where: { professionalId: profile.id },
      });
      await this.prisma.professionalAvailability.createMany({
        data: dto.availability.map((item) => ({
          professionalId: profile.id,
          dayOfWeek: item.dayOfWeek,
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      });
    }

    return this.prisma.professionalProfile.findUniqueOrThrow({
      where: { id: profile.id },
      include: professionalInclude,
    });
  }

  async myPortfolio(userId: string) {
    const profile = await this.getProfileByUser(userId);
    return this.prisma.portfolioProject.findMany({
      where: { professionalId: profile.id },
      include: { images: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMe(userId: string) {
    const profile = await this.prisma.professionalProfile.findUnique({
      where: { userId },
      include: professionalWithReviewsInclude,
    });

    if (!profile) {
      throw new NotFoundException('Perfil profissional nao encontrado.');
    }

    return profile;
  }

  async createPortfolio(userId: string, dto: CreatePortfolioProjectDto) {
    const profile = await this.getProfileByUser(userId);
    return this.prisma.portfolioProject.create({
      data: {
        professionalId: profile.id,
        title: dto.title,
        location: dto.location,
        description: dto.description,
        images: dto.images?.length
          ? {
              create: dto.images.map((image) => ({
                url: image.url,
                type: image.type,
                altText: image.altText,
              })),
            }
          : undefined,
      },
      include: { images: true },
    });
  }

  async updatePortfolio(userId: string, id: string, dto: UpdatePortfolioProjectDto) {
    const profile = await this.getProfileByUser(userId);
    await this.assertOwnsProject(profile.id, id);

    if (dto.images) {
      await this.prisma.portfolioProjectImage.deleteMany({ where: { projectId: id } });
    }

    return this.prisma.portfolioProject.update({
      where: { id },
      data: {
        title: dto.title,
        location: dto.location,
        description: dto.description,
        images: dto.images
          ? {
              create: dto.images.map((image) => ({
                url: image.url,
                type: image.type,
                altText: image.altText,
              })),
            }
          : undefined,
      },
      include: { images: true },
    });
  }

  async deletePortfolio(userId: string, id: string) {
    const profile = await this.getProfileByUser(userId);
    await this.assertOwnsProject(profile.id, id);
    await this.prisma.portfolioProject.delete({ where: { id } });
    return { deleted: true };
  }

  async getProfileByUser(userId: string) {
    const profile = await this.prisma.professionalProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ForbiddenException('Perfil profissional nao cadastrado.');
    }

    return profile;
  }

  private async assertOwnsProject(professionalId: string, projectId: string) {
    const project = await this.prisma.portfolioProject.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Projeto nao encontrado.');
    }

    if (project.professionalId !== professionalId) {
      throw new ForbiddenException('Projeto pertence a outro profissional.');
    }
  }
}
