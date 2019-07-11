import { Types } from 'mongoose';
import { Controller, Get, Query, Param, Post, Body, Put, Logger } from '@nestjs/common';

import { FoundationCreateDTO, FoundationUpdateDTO } from './dto/foundations.dto';

import { FoundationsService } from '../core/foundations.service';
import { CollectPointsService } from '../core/collect-points.service';
import { CampaignsService } from 'core/campaigns.service';

@Controller('foundations')
export class FoundationsController {

    private logger: Logger;

    constructor(
        private readonly foundationService: FoundationsService,
        private readonly campaignService: CampaignsService,
        private readonly collectPointService: CollectPointsService,
    ) {
        this.logger = new Logger(FoundationsController.name);
    }

    @Get(':id/collectPoints')
    async getCollectPoints(@Param('id') id: Types.ObjectId) {
        try {
            return await this.collectPointService.listByFoundation(id);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

    @Get(':id/campaigns')
    async getCampaigns(@Param('id') id: Types.ObjectId) {
        try {
            return await this.campaignService.listByFoundation(id);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

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
