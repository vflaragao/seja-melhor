import { Module } from '@nestjs/common';

import { FoundationsController } from './foundations.controller';

import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FoundationsController]
})
export class FoundationsModule {}
