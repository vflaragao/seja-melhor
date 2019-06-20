import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from '@models/product';
import { ProductDTO } from './dto/product.dto';
import { Database } from '@helpers/database';

@Injectable()
export class ProductsService {

    constructor (
        @InjectModel('Product')
        private readonly productModel: Model<Product>
    ) {}

    save(payload: ProductDTO) {
        const campaign = new this.productModel(payload);
        return campaign.save();
    }

    list(query: string) {
        const condition = Database.search(['name'], query);
        return this.productModel.find(condition)
            .sort({ name: 1 })
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.productModel.findById(id)
            .exec();
    }

    getTypesByIds(ids: Array<Types.ObjectId>) {
        return this.productModel.find({
                _id: { $in: ids }
            })
            .select('type')
            .exec();
    }

    update(id: Types.ObjectId, payload: ProductDTO) {
        return this.productModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
