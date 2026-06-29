import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationDto } from './dto/update-application.dto';

@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get('my')
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.applicationsService.findMine(user.id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(user.id, id, dto);
  }

  @Post(':id/accept')
  accept(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.applicationsService.accept(user.id, id);
  }

  @Post(':id/reject')
  reject(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.applicationsService.reject(user.id, id);
  }
}
