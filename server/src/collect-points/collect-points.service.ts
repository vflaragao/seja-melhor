import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CollectPoint } from '@models/collect-point';
import { CollectPointDTO } from './dto/collect-point.dto';

@Injectable()
export class CollectPointsService {

    constructor (
        @InjectModel('CollectPoint')
        private readonly collectPointModel: Model<CollectPoint>
    ) {}

    async save(payload: CollectPointDTO) {
        const collectPoint = new this.collectPointModel(payload);
        return collectPoint.save();
    }

    list() {
        return this.collectPointModel.find()
            .sort({ renewalDay: 1 })
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.collectPointModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: CollectPointDTO) {
        return this.collectPointModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
