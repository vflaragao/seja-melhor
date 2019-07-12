import { Module } from '@nestjs/common';

import { FoundationsController } from './foundations.controller';

import { AuthModule } from 'auth/auth.module';
import { FoundationRoleGuard } from './foundation-role.guard';

@Module({
  imports: [AuthModule],
  controllers: [FoundationsController],
  providers: [FoundationRoleGuard],
  exports: [FoundationRoleGuard],
})
export class FoundationsModule {}
