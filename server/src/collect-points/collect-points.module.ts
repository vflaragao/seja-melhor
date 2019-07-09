import { Module } from '@nestjs/common';

import { CollectPointsController } from './collect-points.controller';

import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CollectPointsController]
})
export class CollectPointsModule {}
