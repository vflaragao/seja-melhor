import { Module } from '@nestjs/common';

import { DonationsController } from './donations.controller';

import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DonationsController]
})
export class DonationsModule {}
