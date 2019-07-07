import { Module, HttpModule } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [HttpModule],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
