import { ContractStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateContractStatusDto {
  @IsEnum(ContractStatus)
  status: ContractStatus;

  @IsOptional()
  @IsString()
  note?: string;
}
