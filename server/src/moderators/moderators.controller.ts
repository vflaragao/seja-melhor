import { Controller, Post, Body, Get, Query, Put } from '@nestjs/common';

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

    @Get()
    async listModerators(@Query('q') query) {
        const list = await this.moderatorService.list(query);
        return list;
    }

    @Put(':id')
    async disableModerator(@Body() username) {
        const moderator = await this.moderatorService.disable(username);
        return moderator;
    }
}
