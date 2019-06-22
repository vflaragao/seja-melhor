import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { CollectPointSchema } from '@models/collect-point';
import { CollectPointsService } from './collect-points.service';
import { CollectPointsController } from './collect-points.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'CollectPoint', schema: CollectPointSchema }])],
  providers: [CollectPointsService],
  controllers: [CollectPointsController],
  exports: [CollectPointsService]
})
export class CollectPointsModule {}
