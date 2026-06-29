import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class UpdateServiceAdDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'Horario deve estar no formato HH:mm.' })
  startTime?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  deadlineDays?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  budget?: number;

  @IsOptional()
  @IsBoolean()
  negotiable?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}
