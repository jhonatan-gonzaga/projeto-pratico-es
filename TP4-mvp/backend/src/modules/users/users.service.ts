import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('E-mail ou telefone ja cadastrado.');
      }

      throw error;
    }
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateMe(id: string, data: UpdateMeDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email?.toLowerCase(),
          phone: data.phone,
          avatarUrl: data.avatarUrl,
        },
      });
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('E-mail ou telefone ja cadastrado.');
      }

      throw error;
    }
  }

  updatePasswordHash(id: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
  }

  async deleteMe(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    await this.prisma.user.delete({ where: { id } });
    return { deleted: true };
  }

  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
  }
}
