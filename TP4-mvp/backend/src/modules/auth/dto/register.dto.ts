import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'Informe um e-mail valido.' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Perfil de usuario invalido.' })
  role?: UserRole;
}
