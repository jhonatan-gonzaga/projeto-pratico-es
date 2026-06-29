import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DirectRequestsController } from './direct-requests.controller';
import { DirectRequestsService } from './direct-requests.service';

@Module({
  imports: [PrismaModule],
  controllers: [DirectRequestsController],
  providers: [DirectRequestsService],
})
export class DirectRequestsModule {}
