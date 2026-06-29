import { PortfolioImageType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

class UpdatePortfolioImageDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsEnum(PortfolioImageType)
  type?: PortfolioImageType;

  @IsOptional()
  @IsString()
  altText?: string;
}

export class UpdatePortfolioProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePortfolioImageDto)
  images?: UpdatePortfolioImageDto[];
}
