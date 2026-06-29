import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContractsService } from './contracts.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReplyReviewDto } from './dto/reply-review.dto';
import { ReportReviewDto } from './dto/report-review.dto';
import { UpdateContractStatusDto } from './dto/update-contract-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('my')
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.contractsService.findMine(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.contractsService.findOne(user.id, id);
  }

  @Patch(':id/status')
  updateStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateContractStatusDto,
  ) {
    return this.contractsService.updateStatus(user.id, id, dto);
  }

  @Post(':id/review')
  createReview(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.contractsService.createReview(user.id, id, dto);
  }

  @Post('reviews/:id/reply')
  replyReview(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: ReplyReviewDto,
  ) {
    return this.contractsService.replyReview(user.id, id, dto);
  }

  @Post('reviews/:id/report')
  reportReview(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: ReportReviewDto,
  ) {
    return this.contractsService.reportReview(user.id, id, dto);
  }
}
