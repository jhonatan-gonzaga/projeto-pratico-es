import { PortfolioImageType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

class PortfolioImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsOptional()
  @IsEnum(PortfolioImageType)
  type?: PortfolioImageType;

  @IsOptional()
  @IsString()
  altText?: string;
}

export class CreatePortfolioProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PortfolioImageDto)
  images?: PortfolioImageDto[];
}
