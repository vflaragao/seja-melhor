import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put, UseGuards } from '@nestjs/common';

import { CollectPointDTO, CollectPointCreateDTO } from './dto/collect-point.dto';

import { CollectPointsService } from '../core/collect-points.service';
import { AuthGuard } from '@nestjs/passport';
import { Acc } from '@shared/decorator/account.decorator';
import { Account } from 'auth/jwt.interface';

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
    @UseGuards(AuthGuard())
    async registerCollectPoint(@Body() payload: CollectPointCreateDTO, @Acc() account: Account) {
        const collectPoint = await this.collectPointService.saveFromActivity(payload, account);
        return collectPoint;
    }

    @Put(':id')
    async updateCollectPoint(@Param('id') id: Types.ObjectId, @Body() payload: CollectPointCreateDTO) {
        const collectPoint = await this.collectPointService.update(id, payload);
        return collectPoint;
    }
}
