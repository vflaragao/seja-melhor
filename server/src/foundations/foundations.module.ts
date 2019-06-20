import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoundationSchema } from '@models/foundation';
import { FoundationsService } from './foundations.service';
import { FoundationsController } from './foundations.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Foundation', schema: FoundationSchema }])],
  providers: [FoundationsService],
  controllers: [FoundationsController]
})
export class FoundationsModule {}
