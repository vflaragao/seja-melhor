import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Body, Post, Put } from '@nestjs/common';

import { CampaignDTO } from './dto/campaign.dto';
import { CampaignsService } from './campaigns.service';
import { Dates } from '@helpers/date';

@Controller('campaigns')
export class CampaignsController {

    constructor(
        private readonly campaignService: CampaignsService
    ) { }

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
    async registerCampaign(@Body() payload: CampaignDTO) {
        payload.expiresAt = Dates.add(payload.ttl, 'days').toDate();
        const campaign = await this.campaignService.save(payload);
        return campaign;
    }

    @Put(':id')
    async updateCampaign(@Param('id') id: Types.ObjectId, @Body() payload: CampaignDTO) {
        const campaign = await this.campaignService.update(id, payload);
        return campaign;
    }
}
