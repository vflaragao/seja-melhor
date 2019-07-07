import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';

import { FoundationSchema } from '@models/foundation';
import { FoundationsService } from './foundations.service';
import { FoundationsController } from './foundations.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Foundation', schema: FoundationSchema }]),
  ],
  providers: [FoundationsService],
  controllers: [FoundationsController],
  exports: [FoundationsService],
})
export class FoundationsModule {}
