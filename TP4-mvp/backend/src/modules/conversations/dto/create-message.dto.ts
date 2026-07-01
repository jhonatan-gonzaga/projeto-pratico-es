import { MessageType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, ValidateIf } from 'class-validator';

export class CreateMessageDto {
  @IsOptional()
  @IsEnum(MessageType)
  type?: MessageType;

  @ValidateIf((dto: CreateMessageDto) => !dto.type || dto.type === MessageType.TEXT)
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  text?: string;

  @ValidateIf((dto: CreateMessageDto) => dto.type === MessageType.AUDIO)
  @IsString()
  @IsNotEmpty()
  audioUrl?: string;

  @ValidateIf((dto: CreateMessageDto) => dto.type === MessageType.IMAGE)
  @IsString()
  @IsNotEmpty()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationMs?: number;
}
