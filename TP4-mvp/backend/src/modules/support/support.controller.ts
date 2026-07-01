import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { SupportService } from './support.service';

@UseGuards(JwtAuthGuard)
@Controller('support-tickets')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateSupportTicketDto,
  ) {
    return this.supportService.createTicket(user.id, dto);
  }

  @Get('my')
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.supportService.findMine(user.id);
  }
}
