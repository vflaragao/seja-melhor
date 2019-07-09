import { Types } from 'mongoose';
import { Controller, Post, Get, Put, Body, Query, Param, Logger } from '@nestjs/common';

import { UserDTO, UserCreateDTO } from './dto/users.dto';

import { UsersService } from '../core/users.service';
import { CampaignsService } from '../core/campaigns.service';
import { CollectPointsService } from '../core/collect-points.service';

@Controller('users')
export class UsersController {

    private logger: Logger;

    constructor(
        private readonly userService: UsersService,
        private readonly campaignService: CampaignsService,
        private readonly collectPointService: CollectPointsService,
    ) {
        this.logger = new Logger(UsersController.name);
    }

    @Get('exists')
    async existsUser(@Query('e') email: string) {
        const user = await this.userService.existsByEmail(email);
        return user;
    }

    @Get(':id')
    async getUser(@Param('id') id: Types.ObjectId) {
        const user = await this.userService.get(id);
        return user;
    }

    @Get(':id/collectPoints')
    async getCollectPoints(@Param('id') id: Types.ObjectId) {
        try {
            return await this.collectPointService.listByUser(id);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

    @Get(':id/campaigns')
    async getCampaigns(@Param('id') id: Types.ObjectId) {
        try {
            return await this.campaignService.listByUser(id);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

    @Get(':id/statistics')
    async getStatistics(@Param('id') id: Types.ObjectId) {
        const user = await this.userService.get(id);
        return user;
    }

    @Get()
    async listUsers(@Query('q') query) {
        const list = await this.userService.list(query);
        return list;
    }

    @Post()
    async registerUser(@Body() payload: UserCreateDTO) {
        try {
            return await this.userService.save(payload);
        } catch (e) {
            this.logger.error(e);
            return e;
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: Types.ObjectId, @Body() payload: UserDTO) {
        const User = await this.userService.update(id, payload);
        return User;
    }
}
