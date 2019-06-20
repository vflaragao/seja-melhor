import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Database } from '@helpers/database';

import { Campaign } from '@models/campaign';
import { CampaignDTO } from './dto/campaign.dto';

import { ProductsService } from 'products/products.service';

@Injectable()
export class CampaignsService {

    constructor (
        @InjectModel('Campaign')
        private readonly campaignModel: Model<Campaign>,
        private readonly productService: ProductsService
    ) {}

    async save(payload: CampaignDTO) {
        /** Populate campaign types from products requested */
        const products = payload.items.map(item => item.product);
        const types = await this.productService.getTypesByIds(products);
        payload.types = types.map(productType => productType.type);

        const campaign = new this.campaignModel(payload);
        return campaign.save();
    }

    list(query: string) {
        const condition = Database.search(['name', 'cnpj'], query);
        return this.campaignModel.find(condition)
            .sort({ name: 1 })
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.campaignModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: CampaignDTO) {
        return this.campaignModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
