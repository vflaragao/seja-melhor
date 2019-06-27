import { Types } from 'mongoose';
import { Controller, Post, Get, Put, Body, Query, Param } from '@nestjs/common';

import { UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
    ) { }

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

    @Get()
    async listUsers(@Query('q') query) {
        const list = await this.userService.list(query);
        return list;
    }

    @Post()
    async registerUser(@Body() payload: UserDTO) {
        const User = await this.userService.save(payload);
        return User;
    }

    @Put(':id')
    async updateUser(@Param('id') id: Types.ObjectId, @Body() payload) {
        const User = await this.userService.update(id, payload);
        return User;
    }
}
