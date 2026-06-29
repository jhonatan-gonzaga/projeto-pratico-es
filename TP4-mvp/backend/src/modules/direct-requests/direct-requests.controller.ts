import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDirectRequestDto } from './dto/create-direct-request.dto';
import { DirectRequestsService } from './direct-requests.service';

@UseGuards(JwtAuthGuard)
@Controller('direct-requests')
export class DirectRequestsController {
  constructor(private readonly directRequestsService: DirectRequestsService) {}

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateDirectRequestDto) {
    return this.directRequestsService.create(user.id, dto);
  }

  @Get('my')
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.directRequestsService.findMine(user.id);
  }

  @Get('inbox')
  inbox(@CurrentUser() user: AuthenticatedUser) {
    return this.directRequestsService.inbox(user.id);
  }

  @Get('inbox/summary')
  inboxSummary(@CurrentUser() user: AuthenticatedUser) {
    return this.directRequestsService.inboxSummary(user.id);
  }

  @Post(':id/accept')
  accept(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.directRequestsService.accept(user.id, id);
  }

  @Post(':id/reject')
  reject(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.directRequestsService.reject(user.id, id);
  }

  @Post(':id/cancel')
  cancel(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.directRequestsService.cancel(user.id, id);
  }
}
