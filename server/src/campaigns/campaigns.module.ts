import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CampaignSchema } from '@models/campaign';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';

import { ProductsModule } from 'products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema }])
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController]
})
export class CampaignsModule {}
