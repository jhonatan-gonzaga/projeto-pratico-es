import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ContractStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateContractStatusDto } from './dto/update-contract-status.dto';

@Injectable()
export class ContractStatusPolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async assertCanUpdate(userId: string, id: string, dto: UpdateContractStatusDto) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        client: true,
        professional: true,
        review: true,
      },
    });

    if (!contract) {
      throw new NotFoundException('Contrato nao encontrado.');
    }

    const isClient = contract.client.userId === userId;
    const isProfessional = contract.professional.userId === userId;

    if (!isClient && !isProfessional) {
      throw new ForbiddenException('Contrato pertence a outro usuario.');
    }

    if (contract.review && dto.status === ContractStatus.REOPENED) {
      throw new BadRequestException('Servico avaliado nao pode ser reaberto.');
    }

    if (isProfessional) {
      const allowedForProfessional: Partial<Record<ContractStatus, ContractStatus[]>> = {
        PENDING_START: [ContractStatus.IN_PROGRESS],
        REOPENED: [ContractStatus.IN_PROGRESS],
        IN_PROGRESS: [],
      };

      if (!allowedForProfessional[contract.status]?.includes(dto.status)) {
        throw new BadRequestException('Este status deve ser confirmado pelo cliente.');
      }
    }

    if (isClient) {
      const allowedForClient: Partial<Record<ContractStatus, ContractStatus[]>> = {
        PENDING_START: [ContractStatus.CANCELED],
        IN_PROGRESS: [ContractStatus.COMPLETED],
        WAITING_CLIENT_APPROVAL: [ContractStatus.COMPLETED],
        COMPLETED: contract.review ? [] : [ContractStatus.REOPENED],
      };

      if (!allowedForClient[contract.status]?.includes(dto.status)) {
        throw new BadRequestException('Aguarde o profissional atualizar esta etapa do servico.');
      }
    }
  }
}
