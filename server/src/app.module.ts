import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { ProductsModule } from './products/products.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DonationsModule } from './donations/donations.module';
import { ModeratorsModule } from './moderators/moderators.module';
import { FoundationsModule } from './foundations/foundations.module';
import { CollectPointsModule } from './collect-points/collect-points.module';

import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,

    UsersModule,
    GoalsModule,
    ProductsModule,
    CampaignsModule,
    DonationsModule,
    ModeratorsModule,
    FoundationsModule,
    CollectPointsModule,

    /** Database */
    MongooseModule.forRoot('mongodb://localhost/seja-melhor', { useNewUrlParser: true }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
