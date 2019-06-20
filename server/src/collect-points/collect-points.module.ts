import { Module } from '@nestjs/common';
import { CollectPointsService } from './collect-points.service';
import { CollectPointsController } from './collect-points.controller';

@Module({
  providers: [CollectPointsService],
  controllers: [CollectPointsController]
})
export class CollectPointsModule {}
