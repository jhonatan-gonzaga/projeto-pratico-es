import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ServiceAdStatus } from '@prisma/client';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class ServiceAdQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(ServiceAdStatus)
  status?: ServiceAdStatus;
}
