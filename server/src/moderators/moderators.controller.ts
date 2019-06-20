import { Types } from 'mongoose';
import { Controller, Post, Body, Get, Query, Put, Param } from '@nestjs/common';

import { ModeratorDTO } from './dto/moderator.dto';
import { ModeratorsService } from './moderators.service';

@Controller('moderators')
export class ModeratorsController {

    constructor(
        private readonly moderatorService: ModeratorsService
    ) { }

    @Post()
    async registerModerator(@Body() payload: ModeratorDTO) {
        const moderator = await this.moderatorService.save(payload);
        return moderator;
    }

    @Get(':id')
    async getModerator(@Param('id') id: Types.ObjectId) {
        const list = await this.moderatorService.get(id);
        return list;
    }

    @Get()
    async listModerators(@Query('q') query) {
        const list = await this.moderatorService.list(query);
        return list;
    }

    @Put(':id')
    async disableModerator(@Param('id') id: Types.ObjectId) {
        const moderator = await this.moderatorService.disable(id);
        return moderator;
    }
}