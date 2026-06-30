import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { CreateApplicationDto } from '../applications/dto/create-application.dto';
import { ApplicationsService } from '../applications/applications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateServiceAdDto } from './dto/create-service-ad.dto';
import { ServiceAdQueryDto } from './dto/service-ad-query.dto';
import { UpdateServiceAdStatusDto } from './dto/update-service-ad-status.dto';
import { UpdateServiceAdDto } from './dto/update-service-ad.dto';
import { ServiceAdsService } from './service-ads.service';

@UseGuards(JwtAuthGuard)
@Controller('service-ads')
export class ServiceAdsController {
  constructor(
    private readonly serviceAdsService: ServiceAdsService,
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateServiceAdDto) {
    return this.serviceAdsService.create(user.id, dto);
  }

  @Get('my')
  findMine(@CurrentUser() user: AuthenticatedUser, @Query() query: ServiceAdQueryDto) {
    return this.serviceAdsService.findMine(user.id, query);
  }

  @Get('my/summary')
  mySummary(@CurrentUser() user: AuthenticatedUser) {
    return this.serviceAdsService.mySummary(user.id);
  }

  @Get('open')
  findOpen(@CurrentUser() user: AuthenticatedUser, @Query() query: ServiceAdQueryDto) {
    return this.serviceAdsService.findOpen(user.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceAdsService.findOne(id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateServiceAdDto,
  ) {
    return this.serviceAdsService.update(user.id, id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateServiceAdStatusDto,
  ) {
    return this.serviceAdsService.updateStatus(user.id, id, dto.status);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.serviceAdsService.remove(user.id, id);
  }

  @Post(':id/dismiss')
  dismiss(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.serviceAdsService.dismiss(user.id, id);
  }

  @Post(':id/applications')
  apply(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(user.id, id, dto);
  }

  @Get(':id/applications')
  findApplications(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.applicationsService.findByAd(user.id, id);
  }
}
