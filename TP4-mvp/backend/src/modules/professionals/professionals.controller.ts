import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePortfolioProjectDto } from './dto/create-portfolio-project.dto';
import { SearchProfessionalsQueryDto } from './dto/search-professionals-query.dto';
import { UpdatePortfolioProjectDto } from './dto/update-portfolio-project.dto';
import { UpsertProfessionalProfileDto } from './dto/upsert-professional-profile.dto';
import { ProfessionalsService } from './professionals.service';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  findAll(@Query() query: SearchProfessionalsQueryDto) {
    return this.professionalsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  upsertMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpsertProfessionalProfileDto,
  ) {
    return this.professionalsService.upsertMe(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMe(@CurrentUser() user: AuthenticatedUser) {
    return this.professionalsService.findMe(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpsertProfessionalProfileDto,
  ) {
    return this.professionalsService.upsertMe(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/portfolio')
  myPortfolio(@CurrentUser() user: AuthenticatedUser) {
    return this.professionalsService.myPortfolio(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/portfolio')
  createPortfolio(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreatePortfolioProjectDto,
  ) {
    return this.professionalsService.createPortfolio(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/portfolio/:id')
  updatePortfolio(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdatePortfolioProjectDto,
  ) {
    return this.professionalsService.updatePortfolio(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/portfolio/:id')
  deletePortfolio(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.professionalsService.deletePortfolio(user.id, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }
}
