import { Module } from '@nestjs/common';
import { FoundationsService } from './foundations.service';
import { FoundationsController } from './foundations.controller';

@Module({
  providers: [FoundationsService],
  controllers: [FoundationsController]
})
export class FoundationsModule {}
