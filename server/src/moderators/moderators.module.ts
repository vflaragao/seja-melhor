import { Module } from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { ModeratorsController } from './moderators.controller';

@Module({
  providers: [ModeratorsService],
  controllers: [ModeratorsController]
})
export class ModeratorsModule {}
