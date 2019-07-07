import { Controller, Get, Query, Logger } from '@nestjs/common';

import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

    private logger: Logger;

    constructor (
        private readonly addressService: AddressService,
    ) {
        this.logger = new Logger(AddressController.name);
    }

    @Get()
    async getAddress(@Query('q') query: string) {
        try {
            return await this.addressService.getAddress(query);
        } catch (e) {
            this.logger.error(e);
            return e;
        }
    }
}
