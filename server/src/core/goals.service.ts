import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ProductsService } from './products.service';

import { Goal } from '@models/goal';
import { GoalDTO } from '../goals/dto/goal.dto';
import { CollectPointsService } from './collect-points.service';
import { UsersService } from './users.service';

@Injectable()
export class GoalsService {

    constructor (
        @InjectModel('Goal')
        private readonly goalModel: Model<Goal>,
        private readonly productService: UsersService
    ) {}

    async save(payload: GoalDTO) {
        /* const products = payload.items.map(item => item.product);
        const types = await this.productService.getTypesByIds(products);
        payload.types = types.map(productType => productType.type);

        const goal = new this.goalModel(payload);
        return goal.save(); */
    }

    list() {
        return this.goalModel.find()
            .sort({ renewalDay: 1 })
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.goalModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: GoalDTO) {
        return this.goalModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
