import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Informe um e-mail valido.' })
  email: string;
}
