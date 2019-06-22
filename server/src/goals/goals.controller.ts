import { Types } from 'mongoose';
import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';

import { GoalsService } from './goals.service';
import { GoalDTO } from './dto/goal.dto';

@Controller('goals')
export class GoalsController {

    constructor(
        private readonly goalService: GoalsService
    ) { }

    @Get(':id')
    async getGoal(@Param('id') id: Types.ObjectId) {
        const goal = await this.goalService.get(id);
        return goal;
    }

    @Get()
    async listGoals(@Query('q') query) {
        const list = await this.goalService.list();
        return list;
    }

    @Post()
    async registerGoal(@Body() payload: GoalDTO) {
        const goal = await this.goalService.save(payload);
        return goal;
    }

    @Put(':id')
    async updateGoal(@Param('id') id: Types.ObjectId, @Body() payload: GoalDTO) {
        const goal = await this.goalService.update(id, payload);
        return goal;
    }
}
