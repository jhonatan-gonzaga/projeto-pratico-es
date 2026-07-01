import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MessageType, NotificationType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.conversation.findMany({
      where: { OR: [{ clientUserId: userId }, { professionalUserId: userId }] },
      include: {
        clientUser: { select: { id: true, name: true } },
        professionalUser: { select: { id: true, name: true } },
        contract: true,
        application: true,
        directRequest: true,
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async messages(userId: string, id: string) {
    await this.assertParticipant(userId, id);
    await this.prisma.message.updateMany({
      where: { conversationId: id, senderId: { not: userId }, readAt: null },
      data: { readAt: new Date() },
    });
    return this.prisma.message.findMany({
      where: { conversationId: id },
      include: { sender: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async unreadCount(userId: string) {
    const count = await this.prisma.message.count({
      where: {
        senderId: { not: userId },
        readAt: null,
        conversation: { OR: [{ clientUserId: userId }, { professionalUserId: userId }] },
      },
    });
    return { count };
  }

  async createMessage(userId: string, id: string, dto: CreateMessageDto) {
    const conversation = await this.assertParticipant(userId, id);
    const message = await this.prisma.message.create({
      data: {
        conversationId: id,
        senderId: userId,
        type: dto.type ?? MessageType.TEXT,
        text: dto.text,
        audioUrl: dto.audioUrl,
        imageUrl: dto.imageUrl,
        durationMs: dto.durationMs,
      },
      include: { sender: { select: { id: true, name: true } } },
    });

    const receiverId =
      conversation.clientUserId === userId
        ? conversation.professionalUserId
        : conversation.clientUserId;

    const messageText = dto.text ?? '';
    await this.prisma.$transaction([
      this.prisma.conversation.update({
        where: { id },
        data: { updatedAt: new Date() },
      }),
      this.prisma.notification.create({
        data: {
          userId: receiverId,
          type: NotificationType.NEW_MESSAGE,
          title: 'Nova mensagem',
          body:
            dto.type === MessageType.AUDIO
              ? 'Mensagem de audio'
              : dto.type === MessageType.IMAGE
                ? 'Imagem enviada'
              : messageText.length > 120
                ? `${messageText.slice(0, 117)}...`
                : messageText,
          data: { conversationId: id, messageId: message.id },
        },
      }),
    ]);

    return message;
  }

  private async assertParticipant(userId: string, id: string) {
    const conversation = await this.prisma.conversation.findUnique({ where: { id } });

    if (!conversation) {
      throw new NotFoundException('Conversa nao encontrada.');
    }

    if (conversation.clientUserId !== userId && conversation.professionalUserId !== userId) {
      throw new ForbiddenException('Conversa pertence a outro usuario.');
    }

    return conversation;
  }
}
