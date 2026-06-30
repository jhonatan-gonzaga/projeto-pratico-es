import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async unreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, readAt: null },
    });
    return { count };
  }

  readAll(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async readOne(userId: string, id: string) {
    await this.assertOwnsNotification(userId, id);
    return this.prisma.notification.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async remove(userId: string, id: string) {
    await this.assertOwnsNotification(userId, id);
    await this.prisma.notification.delete({ where: { id } });
    return { deleted: true };
  }

  registerDevice(userId: string, dto: RegisterDeviceTokenDto) {
    return this.prisma.deviceToken.upsert({
      where: { token: dto.token },
      create: { userId, token: dto.token, platform: dto.platform },
      update: { userId, platform: dto.platform },
    });
  }

  async deleteDevice(userId: string, token: string) {
    const device = await this.prisma.deviceToken.findUnique({ where: { token } });

    if (!device) {
      return { deleted: true };
    }

    if (device.userId !== userId) {
      throw new ForbiddenException('Token pertence a outro usuario.');
    }

    await this.prisma.deviceToken.delete({ where: { token } });
    return { deleted: true };
  }

  private async assertOwnsNotification(userId: string, id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });

    if (!notification) {
      throw new NotFoundException('Notificacao nao encontrada.');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('Notificacao pertence a outro usuario.');
    }
  }
}
