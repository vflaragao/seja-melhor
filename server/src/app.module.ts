import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { AddressModule } from './address/address.module';
import { ProductsModule } from './products/products.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DonationsModule } from './donations/donations.module';
import { ModeratorsModule } from './moderators/moderators.module';
import { FoundationsModule } from './foundations/foundations.module';
import { CollectPointsModule } from './collect-points/collect-points.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GoalsModule,
    AddressModule,
    ProductsModule,
    CampaignsModule,
    DonationsModule,
    ModeratorsModule,
    FoundationsModule,
    CollectPointsModule,

    /** Database */
    MongooseModule.forRoot('mongodb://localhost/seja-melhor', {
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
