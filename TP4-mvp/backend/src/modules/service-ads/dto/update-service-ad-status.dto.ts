import { ServiceAdStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateServiceAdStatusDto {
  @IsEnum(ServiceAdStatus)
  status: ServiceAdStatus;
}
