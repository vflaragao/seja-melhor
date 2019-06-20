import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModeratorsService } from './moderators.service';
import { ModeratorsController } from './moderators.controller';

import { ModeratorSchema } from '@shared/models/moderator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Moderator', schema: ModeratorSchema }])],
  providers: [ModeratorsService],
  controllers: [ModeratorsController]
})
export class ModeratorsModule {}
