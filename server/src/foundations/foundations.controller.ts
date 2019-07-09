import { Types } from 'mongoose';
import { Controller, Get, Query, Param, Post, Body, Put } from '@nestjs/common';

import { FoundationCreateDTO, FoundationUpdateDTO } from './dto/foundations.dto';

import { FoundationsService } from '../core/foundations.service';

@Controller('foundations')
export class FoundationsController {

    constructor(
        private readonly foundationService: FoundationsService,
    ) { }

    @Get(':id')
    async getFoundation(@Param('id') id: Types.ObjectId) {
        const foundation = await this.foundationService.get(id);
        return foundation;
    }

    @Get()
    async listFoundations(@Query('q') query) {
        const list = await this.foundationService.list(query);
        return list;
    }

    @Post()
    async registerFoundation(@Body() payload: FoundationCreateDTO) {
        const Foundation = await this.foundationService.save(payload);
        return Foundation;
    }

    @Put(':id')
    async updateFoundation(@Param('id') id: Types.ObjectId, @Body() payload: FoundationUpdateDTO) {
        const Foundation = await this.foundationService.update(id, payload);
        return Foundation;
    }
}
