import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Logger, BadRequestException, Post, Body, Get, HttpCode, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { Account } from './jwt.interface';

import { Acc } from '@shared/decorator/account.decorator';
import { Credentials } from '@models/fields/credentials';

@Controller('auth')
export class AuthController {

    private logger: Logger;

    constructor(
        private readonly authService: AuthService,
    ) {
        this.logger = new Logger(AuthController.name);
    }

    @Post('login')
    @HttpCode(200)
    async authenticate(@Body() credential: Credentials) {
        try {
            const accessToken = await this.authService.authenticate(credential);
            if (!accessToken) {
                throw new BadRequestException('Credenciais incorretas');
            }
            return { accessToken };
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }

    }

    @Post('change')
    @UseGuards(AuthGuard())
    async changeAccount(@Body('account') accountID: Types.ObjectId, @Acc() account: Account) {
        try {
            const accessToken = await this.authService.changeSelectedAccount(account, accountID);
            return { accessToken };
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard())
    async getProfile(@Acc() account: Account) {
        try {
            return await this.authService.getAccount(account.user);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }

    @Get('profiles')
    @UseGuards(AuthGuard())
    async listProfiles(@Acc() account: Account) {
        try {
            return await this.authService.listAccounts(account.user);
        } catch (e) {
            this.logger.error(e.message, e.stack);
            throw e;
        }
    }
}
