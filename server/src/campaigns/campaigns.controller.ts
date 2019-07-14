import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put, UseGuards, Logger } from '@nestjs/common';

import { CampaignCreateDTO } from './dto/campaign.dto';

import { CampaignsService } from '../core/campaigns.service';
import { Acc } from '@shared/decorator/account.decorator';
import { Account } from 'auth/jwt.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('campaigns')
export class CampaignsController {

    private logger: Logger;

    constructor(
        private readonly campaignService: CampaignsService
    ) {
        this.logger = new Logger(CampaignsController.name);
    }

    @Get(':id/stats')
    async listStats(@Param('id') id: Types.ObjectId) {
        /* try {
            return await this.campaignService.listCollectPoints(id, query);
        } catch (e) {
            this.logger.error(e);
            throw e;
        } */
    }

    @Get(':id/collectPoints')
    async listCollectPoints(@Param('id') id: Types.ObjectId, @Query('query') query: string) {
        try {
            return await this.campaignService.listCollectPoints(id, query);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    @Get(':id/items')
    async listItems(@Param('id') id: Types.ObjectId, @Query('query') query: string) {
        try {
            return await this.campaignService.listItems(id, query);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    @Get(':id')
    async getCampaign(@Param('id') id: Types.ObjectId) {
        const campaign = await this.campaignService.get(id);
        return campaign;
    }

    @Get()
    async listCampaigns(@Query('q') query) {
        const list = await this.campaignService.list(query);
        return list;
    }

    @Post()
    @UseGuards(AuthGuard())
    async registerCampaign(@Body() payload: CampaignCreateDTO, @Acc() account: Account) {
        const campaign = await this.campaignService.save(payload, account);
        return campaign;
    }

    @Put(':id')
    async updateCampaign(@Param('id') id: Types.ObjectId, @Body() payload: CampaignCreateDTO) {
        const campaign = await this.campaignService.update(id, payload);
        return campaign;
    }
}
