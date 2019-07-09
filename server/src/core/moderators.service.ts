import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Database } from '@helpers/database';

import { Moderator } from '@models/moderator';
import { ModeratorDTO } from '../moderators/dto/moderator.dto';

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
        const condition = Database.search(['name', 'username'], query);
        return this.moderatorModel.find(condition)
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
