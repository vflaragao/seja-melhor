import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put, UseGuards, Logger } from '@nestjs/common';

import { CollectPointCreateDTO } from './dto/collect-point.dto';

import { CollectPointsService } from '../core/collect-points.service';
import { AuthGuard } from '@nestjs/passport';
import { Acc } from '@shared/decorator/account.decorator';
import { Account } from 'auth/jwt.interface';
import { DonationService } from 'core/donation.service';
import { DonationStatus } from '@models/donation';

@Controller('collectPoints')
export class CollectPointsController {

    private logger: Logger;

    constructor(
        private readonly donationService: DonationService,
        private readonly collectPointService: CollectPointsService,
    ) {
        this.logger = new Logger(CollectPointsController.name);
    }

    @Get(':id/donations')
    async getDonations(@Param('id') id: Types.ObjectId, @Query('sts') status: DonationStatus) {
        try {
            return await this.donationService.listByCollectPoint(id, status);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

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
