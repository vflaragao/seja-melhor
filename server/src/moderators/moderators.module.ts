import { Module } from '@nestjs/common';

import { ModeratorsController } from './moderators.controller';

import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ModeratorsController]
})
export class ModeratorsModule {}
