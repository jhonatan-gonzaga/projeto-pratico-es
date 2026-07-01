import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email.toLowerCase(),
      phone: registerDto.phone,
      passwordHash,
      role: registerDto.role ?? UserRole.CLIENTE,
    });

    return this.buildAuthResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email.toLowerCase());

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha invalidos.');
    }

    const passwordMatches = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('E-mail ou senha invalidos.');
    }

    return this.buildAuthResponse(user);
  }

  async google(googleAuthDto: GoogleAuthDto) {
    const email = googleAuthDto.email.toLowerCase();
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      return this.buildAuthResponse(existingUser);
    }

    const passwordHash = await bcrypt.hash(this.generateTemporaryPassword(), 10);
    const user = await this.usersService.create({
      name: googleAuthDto.name,
      email,
      avatarUrl: googleAuthDto.avatarUrl,
      passwordHash,
      role: UserRole.CLIENTE,
    });

    return this.buildAuthResponse(user);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email.toLowerCase());

    if (!user) {
      throw new NotFoundException('E-mail nao encontrado.');
    }

    const temporaryPassword = this.generateTemporaryPassword();
    const passwordHash = await bcrypt.hash(temporaryPassword, 10);
    await this.usersService.updatePasswordHash(user.id, passwordHash);

    return {
      message: 'Senha temporaria gerada com sucesso.',
      temporaryPassword,
    };
  }

  async profile(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    return this.sanitizeUser(user);
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    const passwordMatches = await bcrypt.compare(dto.currentPassword, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Senha atual invalida.');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.usersService.updatePasswordHash(userId, passwordHash);

    return { message: 'Senha alterada com sucesso.' };
  }

  private buildAuthResponse(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: this.sanitizeUser(user),
    };
  }

  private sanitizeUser(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private generateTemporaryPassword() {
    const suffix = Math.random().toString(36).slice(2, 8);
    return `Conecta${suffix}1`;
  }
}
