import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
