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

    listByUser(id: Types.ObjectId) {
        return this.collectPointModel.find({
                creator: id,
                creatorSource: 'User',
                disabled: false,
                headOffice: false,
            })
            .select('address operatingInfo renewalDay expiresAt authorization')
            .exec();
    }
    
    listByFoundation(id: Types.ObjectId) {
        return this.collectPointModel.find({
                creator: id,
                creatorSource: 'Foundation',
                disabled: false,
            })
            .select('address operatingInfo renewalDay expiresAt authorization')
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
