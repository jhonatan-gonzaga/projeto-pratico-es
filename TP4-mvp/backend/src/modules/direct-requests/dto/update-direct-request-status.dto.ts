import { DirectRequestStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateDirectRequestStatusDto {
  @IsEnum(DirectRequestStatus)
  status: DirectRequestStatus;
}
