import { ApplicationStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateApplicationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  proposedValue?: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
