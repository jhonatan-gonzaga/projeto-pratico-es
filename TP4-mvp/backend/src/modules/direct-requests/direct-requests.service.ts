import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ContractStatus, DirectRequestStatus, NotificationType, UserRole } from '@prisma/client';
import { optionalFutureDate } from '../../common/utils/date';
import { PrismaService } from '../../prisma/prisma.service';
import { contractInclude } from '../contracts/contract-include';
import { CreateDirectRequestDto } from './dto/create-direct-request.dto';

const directRequestInclude = {
  client: { include: { user: { select: { id: true, name: true, phone: true, avatarUrl: true } } } },
  professional: {
    include: {
      user: { select: { id: true, name: true, phone: true, avatarUrl: true } },
      specialties: { include: { category: true } },
    },
  },
  contract: true,
  conversations: true,
  images: true,
};

@Injectable()
export class DirectRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateDirectRequestDto) {
    const client = await this.ensureClientProfile(userId);
    const professional = await this.prisma.professionalProfile.findUnique({
      where: { id: dto.professionalId },
      include: { user: true },
    });

    if (!professional) {
      throw new NotFoundException('Profissional nao encontrado.');
    }

    if (professional.userId === userId) {
      throw new BadRequestException('Voce nao pode contratar diretamente seu proprio perfil.');
    }

    return this.prisma.$transaction(async (tx) => {
      const request = await tx.directRequest.create({
        data: {
          clientId: client.id,
          professionalId: professional.id,
          title: dto.title,
          description: dto.description,
          location: dto.location,
          startDate: optionalFutureDate(dto.startDate),
          startTime: dto.startTime,
          deadlineDays: dto.deadlineDays,
          budget: dto.budget,
          images: dto.imageUrls?.length
            ? { create: dto.imageUrls.map((url) => ({ url })) }
            : undefined,
        },
      });

      await tx.conversation.create({
        data: {
          clientUserId: userId,
          professionalUserId: professional.userId,
          directRequestId: request.id,
        },
      });

      await tx.notification.create({
        data: {
          userId: professional.userId,
          type: NotificationType.DIRECT_REQUEST_RECEIVED,
          title: 'Nova solicitacao direta',
          body: `Voce recebeu uma solicitacao para ${request.title}.`,
          data: { directRequestId: request.id },
        },
      });

      return tx.directRequest.findUniqueOrThrow({
        where: { id: request.id },
        include: directRequestInclude,
      });
    });
  }

  async findMine(userId: string) {
    return this.prisma.directRequest.findMany({
      where: { client: { userId } },
      include: directRequestInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async inbox(userId: string) {
    return this.prisma.directRequest.findMany({
      where: { professional: { userId } },
      include: directRequestInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async inboxSummary(userId: string) {
    const pendingDirectRequests = await this.prisma.directRequest.count({
      where: { professional: { userId }, status: DirectRequestStatus.SENT },
    });
    return { pendingDirectRequests };
  }

  async accept(userId: string, id: string) {
    const request = await this.getForProfessional(userId, id);

    if (request.status !== DirectRequestStatus.SENT) {
      throw new BadRequestException('Solicitacao direta nao esta pendente.');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.directRequest.update({
        where: { id },
        data: { status: DirectRequestStatus.ACCEPTED },
      });
      const contract = await tx.contract.create({
        data: {
          clientId: request.clientId,
          professionalId: request.professionalId,
          directRequestId: request.id,
          title: request.title,
          description: request.description,
          agreedValue: request.budget,
          startDate: request.startDate,
          status: ContractStatus.PENDING_START,
        },
      });
      await tx.contractStatusHistory.create({
        data: { contractId: contract.id, toStatus: ContractStatus.PENDING_START },
      });
      await tx.conversation.updateMany({
        where: { directRequestId: request.id },
        data: { contractId: contract.id },
      });
      await tx.notification.create({
        data: {
          userId: request.client.userId,
          type: NotificationType.DIRECT_REQUEST_ACCEPTED,
          title: 'Solicitacao aceita',
          body: `Sua solicitacao ${request.title} foi aceita.`,
          data: { directRequestId: request.id, contractId: contract.id },
        },
      });
      return tx.contract.findUniqueOrThrow({
        where: { id: contract.id },
        include: contractInclude,
      });
    });
  }

  async reject(userId: string, id: string) {
    const request = await this.getForProfessional(userId, id);
    await this.prisma.notification.create({
      data: {
        userId: request.client.userId,
        type: NotificationType.DIRECT_REQUEST_REJECTED,
        title: 'Solicitacao recusada',
        body: `Sua solicitacao ${request.title} foi recusada.`,
        data: { directRequestId: request.id },
      },
    });
    return this.prisma.directRequest.update({
      where: { id },
      data: { status: DirectRequestStatus.REJECTED },
      include: directRequestInclude,
    });
  }

  async cancel(userId: string, id: string) {
    const request = await this.prisma.directRequest.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!request) {
      throw new NotFoundException('Solicitacao direta nao encontrada.');
    }

    if (request.client.userId !== userId) {
      throw new ForbiddenException('Solicitacao pertence a outro cliente.');
    }

    return this.prisma.directRequest.update({
      where: { id },
      data: { status: DirectRequestStatus.CANCELED },
      include: directRequestInclude,
    });
  }

  private async getForProfessional(userId: string, id: string) {
    const request = await this.prisma.directRequest.findUnique({
      where: { id },
      include: { client: true, professional: true },
    });

    if (!request) {
      throw new NotFoundException('Solicitacao direta nao encontrada.');
    }

    if (request.professional.userId !== userId) {
      throw new ForbiddenException('Solicitacao pertence a outro profissional.');
    }

    return request;
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
}
