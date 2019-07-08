import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '@models/user';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { CampaignsModule } from 'campaigns/campaigns.module';
import { CollectPointsModule } from 'collect-points/collect-points.module';

@Module({
  imports: [
    CampaignsModule,
    CollectPointsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
