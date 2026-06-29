import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ContractStatus, NotificationType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { contractInclude } from './contract-include';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReplyReviewDto } from './dto/reply-review.dto';
import { ReportReviewDto } from './dto/report-review.dto';
import { UpdateContractStatusDto } from './dto/update-contract-status.dto';

const allowedStatusTransitions: Record<ContractStatus, ContractStatus[]> = {
  PENDING_START: [ContractStatus.IN_PROGRESS, ContractStatus.COMPLETED, ContractStatus.CANCELED],
  IN_PROGRESS: [ContractStatus.WAITING_CLIENT_APPROVAL, ContractStatus.COMPLETED, ContractStatus.CANCELED],
  WAITING_CLIENT_APPROVAL: [ContractStatus.COMPLETED, ContractStatus.REOPENED],
  COMPLETED: [ContractStatus.REOPENED],
  REOPENED: [ContractStatus.IN_PROGRESS, ContractStatus.CANCELED],
  CANCELED: [],
};

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMine(userId: string) {
    await this.ensureMissingConversations(userId);

    return this.prisma.contract.findMany({
      where: {
        OR: [{ client: { userId } }, { professional: { userId } }],
      },
      include: contractInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const contract = await this.getVisibleContract(userId, id);
    return contract;
  }

  async updateStatus(userId: string, id: string, dto: UpdateContractStatusDto) {
    const contract = await this.getVisibleContract(userId, id);
    this.assertStatusTransition(contract.status, dto.status);

    const updated = await this.prisma.$transaction(async (tx) => {
      const next = await tx.contract.update({
        where: { id },
        data: { status: dto.status },
        include: contractInclude,
      });
      await tx.contractStatusHistory.create({
        data: {
          contractId: id,
          fromStatus: contract.status,
          toStatus: dto.status,
          note: dto.note,
        },
      });
      const notifyUserId =
        contract.client.userId === userId
          ? contract.professional.userId
          : contract.client.userId;
      await tx.notification.create({
        data: {
          userId: notifyUserId,
          type: NotificationType.CONTRACT_STATUS_CHANGED,
          title: 'Status do contrato atualizado',
          body: `${contract.title} mudou para ${dto.status}.`,
          data: { contractId: id, status: dto.status },
        },
      });
      return next;
    });

    return updated;
  }

  async createReview(userId: string, id: string, dto: CreateReviewDto) {
    const contract = await this.getVisibleContract(userId, id);

    if (contract.client.userId !== userId) {
      throw new ForbiddenException('Somente o cliente pode avaliar o contrato.');
    }

    if (contract.status === ContractStatus.CANCELED) {
      throw new BadRequestException('Contratos cancelados nao podem ser avaliados.');
    }

    if (contract.review) {
      throw new BadRequestException('Este contrato ja foi avaliado.');
    }

    const review = await this.prisma.$transaction(async (tx) => {
      if (contract.status !== ContractStatus.COMPLETED) {
        await tx.contract.update({
          where: { id },
          data: { status: ContractStatus.COMPLETED },
        });
        await tx.contractStatusHistory.create({
          data: {
            contractId: id,
            fromStatus: contract.status,
            toStatus: ContractStatus.COMPLETED,
            note: 'Contrato concluido ao enviar avaliacao.',
          },
        });
      }

      return tx.review.create({
        data: {
          contractId: id,
          clientId: contract.clientId,
          professionalId: contract.professionalId,
          rating: dto.rating,
          comment: dto.comment,
        },
      });
    });

    const aggregate = await this.prisma.review.aggregate({
      where: { professionalId: contract.professionalId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.professionalProfile.update({
      where: { id: contract.professionalId },
      data: {
        ratingAvg: aggregate._avg.rating ?? undefined,
        servicesDone: aggregate._count.rating,
      },
    });

    await this.prisma.notification.create({
      data: {
        userId: contract.professional.userId,
        type: NotificationType.REVIEW_RECEIVED,
        title: 'Nova avaliacao recebida',
        body: `Voce recebeu uma avaliacao de ${dto.rating} estrela(s).`,
        data: { contractId: id, reviewId: review.id },
      },
    });

    return review;
  }

  async replyReview(userId: string, id: string, dto: ReplyReviewDto) {
    await this.getOwnReview(userId, id, 'Somente o profissional avaliado pode responder.');

    return this.prisma.review.update({
      where: { id },
      data: {
        professionalReply: dto.reply,
        repliedAt: new Date(),
      },
    });
  }

  async reportReview(userId: string, id: string, dto: ReportReviewDto) {
    await this.getOwnReview(userId, id, 'Somente o profissional avaliado pode reportar.');

    return this.prisma.review.update({
      where: { id },
      data: {
        reportReason: dto.reason,
        reportDetails: dto.details,
        reportedAt: new Date(),
      },
    });
  }

  private async getVisibleContract(userId: string, id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: contractInclude,
    });

    if (!contract) {
      throw new NotFoundException('Contrato nao encontrado.');
    }

    if (contract.client.userId !== userId && contract.professional.userId !== userId) {
      throw new ForbiddenException('Contrato pertence a outro usuario.');
    }

    return contract;
  }

  private async getOwnReview(userId: string, id: string, forbiddenMessage: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { professional: true },
    });

    if (!review) {
      throw new NotFoundException('Avaliacao nao encontrada.');
    }

    if (review.professional.userId !== userId) {
      throw new ForbiddenException(forbiddenMessage);
    }

    return review;
  }

  private async ensureMissingConversations(userId: string) {
    const contracts = await this.prisma.contract.findMany({
      where: {
        OR: [{ client: { userId } }, { professional: { userId } }],
        conversations: { none: {} },
      },
      include: {
        client: true,
        professional: true,
      },
    });

    if (contracts.length === 0) {
      return;
    }

    await this.prisma.conversation.createMany({
      data: contracts.map((contract) => ({
        clientUserId: contract.client.userId,
        professionalUserId: contract.professional.userId,
        contractId: contract.id,
        applicationId: contract.applicationId,
        directRequestId: contract.directRequestId,
      })),
      skipDuplicates: true,
    });
  }

  private assertStatusTransition(current: ContractStatus, next: ContractStatus) {
    if (!allowedStatusTransitions[current].includes(next)) {
      throw new BadRequestException(`Transicao de status invalida: ${current} -> ${next}.`);
    }
  }
}
