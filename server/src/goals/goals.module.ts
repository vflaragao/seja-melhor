import { Module } from '@nestjs/common';

import { GoalsController } from './goals.controller';

import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GoalsController]
})
export class GoalsModule {}
