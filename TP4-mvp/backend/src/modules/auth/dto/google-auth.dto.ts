import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class GoogleAuthDto {
  @IsEmail({}, { message: 'Informe um e-mail Google valido.' })
  email: string;

  @IsString()
  @MinLength(2, { message: 'Informe o nome da conta Google.' })
  name: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
