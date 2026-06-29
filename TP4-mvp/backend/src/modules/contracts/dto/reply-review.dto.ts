import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ReplyReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  reply: string;
}
