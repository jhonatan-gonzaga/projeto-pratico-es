import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ApplicationsModule } from '../applications/applications.module';
import { ServiceAdsController } from './service-ads.controller';
import { ServiceAdsService } from './service-ads.service';

@Module({
  imports: [PrismaModule, ApplicationsModule],
  controllers: [ServiceAdsController],
  providers: [ServiceAdsService],
})
export class ServiceAdsModule {}
