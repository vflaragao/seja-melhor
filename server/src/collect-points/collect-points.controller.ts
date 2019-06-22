import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put } from '@nestjs/common';

import { CollectPointDTO } from './dto/collect-point.dto';
import { CollectPointsService } from './collect-points.service';

@Controller('collect-points')
export class CollectPointsController {

    constructor(
        private readonly collectPointService: CollectPointsService
    ) { }

    @Get(':id')
    async getCollectPoint(@Param('id') id: Types.ObjectId) {
        const collectPoint = await this.collectPointService.get(id);
        return collectPoint;
    }

    @Get()
    async listCollectPoints(@Query('q') query) {
        const list = await this.collectPointService.list();
        return list;
    }

    @Post()
    async registerCollectPoint(@Body() payload: CollectPointDTO) {
        const collectPoint = await this.collectPointService.save(payload);
        return collectPoint;
    }

    @Put(':id')
    async updateCollectPoint(@Param('id') id: Types.ObjectId, @Body() payload: CollectPointDTO) {
        const collectPoint = await this.collectPointService.update(id, payload);
        return collectPoint;
    }
}
