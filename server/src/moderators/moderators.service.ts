import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ModeratorDTO } from './dto/moderator.dto';
import { Moderator } from '@models/moderator';

@Injectable()
export class ModeratorsService {

    constructor(
        @InjectModel('Moderator')
        private readonly moderatorModel: Model<Moderator>
    ) { }

    save(payload: ModeratorDTO) {
        const moderator = new this.moderatorModel(payload);
        return moderator.save();
    }

    list(query: string) {
        const queryMatch = new RegExp(query, 'ig');
        return this.moderatorModel.find({
            name: queryMatch,
            email: queryMatch,
            username: queryMatch
        })
        .sort({ name: 1 })
        .exec();
    }

    get(id: Types.ObjectId) {
        return this.moderatorModel.findById(id)
            .exec();
    }

    disable(id: Types.ObjectId) {
        return this.moderatorModel.findByIdAndUpdate(
            id,
            { $set: { disabled: true } },
            { new: true }
        )
        .exec();
    }
}
