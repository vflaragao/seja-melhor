import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Post, Body, Put, UseGuards, Logger } from '@nestjs/common';

import { GoalCreateDTO } from './dto/goal.dto';

import { GoalsService } from '../core/goals.service';
import { Acc } from '@shared/decorator/account.decorator';
import { Account } from 'auth/jwt.interface';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@shared/decorator/roles.decorator';
import { Role } from '@models/fields/collaborator';
import { FoundationRoleGuard } from 'foundations/foundation-role.guard';
import { QueryParam } from '@helpers/search';

@Controller('goals')
export class GoalsController {

    private logger: Logger;

    constructor(
        private readonly goalService: GoalsService
    ) {
        this.logger = new Logger(GoalsController.name);
    }

    @Get(':id/stats')
    async getGoalStats(@Param('id') id: Types.ObjectId) {
        /* const goal = await this.goalService.get(id);
        return goal; */
    }

    @Get(':id/collectPoints')
    async listCollectPoints(@Param('id') id: Types.ObjectId, @Query('query') query: string) {
        try {
            return await this.goalService.listCollectPoints(id, query);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    @Get(':id/items')
    async listItems(@Param('id') id: Types.ObjectId, @Query('q') query: string) {
        try {
            return await this.goalService.listItems(id, query);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    @Get('list')
    async listGoals(@Query('q') query) {
        const list = await this.goalService.list();
        return list;
    }

    @Get()
    @Roles(Role.MANAGER)
    @UseGuards(AuthGuard(), FoundationRoleGuard)
    async getGoal(@Acc() account: Account) {
        try {
            return await this.goalService.getByFoundation(account);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

    @Post()
    @Roles(Role.MANAGER)
    @UseGuards(AuthGuard(), FoundationRoleGuard)
    async registerGoal(@Body() payload: GoalCreateDTO, @Acc() account: Account) {
        try {
            return await this.goalService.save(account, payload);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    @Put()
    @Roles(Role.MANAGER)
    @UseGuards(AuthGuard(), FoundationRoleGuard)
    async updateGoal(@Body() payload: GoalCreateDTO, @Acc() account: Account) {
        try {
            return await this.goalService.update(account, payload);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
