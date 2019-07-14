import { Controller, Post, UseGuards, Body, Logger } from '@nestjs/common';
import { DonationService } from 'core/donation.service';
import { AuthGuard } from '@nestjs/passport';
import { Acc } from '@shared/decorator/account.decorator';
import { Account } from 'auth/jwt.interface';
import { DonationCreateDTO } from './dto/donations.dto';

@Controller('donations')
export class DonationsController {

    private logger: Logger;

    constructor(
        private _donationService: DonationService
    ) {
        this.logger = new Logger(DonationsController.name);
    }
    
    @Post()
    @UseGuards(AuthGuard())
    async registerUser(@Acc() account: Account, @Body() payload: DonationCreateDTO) {
        try {
            return await this._donationService.save(account, payload);
        } catch (e) {
            this.logger.error(e);
            return e;
        }
    }
}
