import { Module } from '@nestjs/common';

import { AddressController } from './address.controller';

import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AddressController]
})
export class AddressModule {}
