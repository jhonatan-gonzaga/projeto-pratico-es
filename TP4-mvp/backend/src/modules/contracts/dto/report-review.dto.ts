import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ReportReviewDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  details: string;
}
