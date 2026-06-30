import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { DirectRequestsModule } from './modules/direct-requests/direct-requests.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { ServiceAdsModule } from './modules/service-ads/service-ads.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProfessionalsModule,
    ServiceAdsModule,
    ApplicationsModule,
    DirectRequestsModule,
    ContractsModule,
    NotificationsModule,
    ConversationsModule,
    UploadsModule,
  ],
})
export class AppModule {}
