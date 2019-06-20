import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Foundation } from '@models/foundation';
import { FoundationsDTO } from './dto/foundations.dto';

@Injectable()
export class FoundationsService {

    constructor (
        @InjectModel('Foundation')
        private readonly foundationModel: Model<Foundation>
    ) {}

    save(payload: FoundationsDTO) {
        const foundation = new this.foundationModel(payload);
        return foundation.save();
    }

    list(query: string) {
        const queryMatch = new RegExp(query, 'ig');
        return this.foundationModel.find({
            name: queryMatch,
            cnpj: queryMatch
        })
        .sort({ name: 1 })
        .exec();
    }

    get(id: Types.ObjectId) {
        return this.foundationModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: FoundationsDTO) {
        return this.foundationModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
