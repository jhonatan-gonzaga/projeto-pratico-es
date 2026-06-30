import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { ContractStatusPolicyService } from './contract-status-policy.service';

@Module({
  imports: [PrismaModule],
  controllers: [ContractsController],
  providers: [ContractsService, ContractStatusPolicyService],
})
export class ContractsModule {}
