import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConversationsService } from './conversations.service';
import { CreateMessageDto } from './dto/create-message.dto';

@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.conversationsService.findAll(user.id);
  }

  @Get('unread-count')
  unreadCount(@CurrentUser() user: AuthenticatedUser) {
    return this.conversationsService.unreadCount(user.id);
  }

  @Get(':id/messages')
  messages(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.conversationsService.messages(user.id, id);
  }

  @Post(':id/messages')
  createMessage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.conversationsService.createMessage(user.id, id, dto);
  }
}
