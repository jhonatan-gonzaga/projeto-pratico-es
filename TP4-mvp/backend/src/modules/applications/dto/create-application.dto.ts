import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateApplicationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  proposedValue?: number;

  @IsOptional()
  @IsString()
  message?: string;
}
