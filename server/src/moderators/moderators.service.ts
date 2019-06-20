import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ModeratorDTO } from './dto/moderator.dto';
import { Moderator } from '@shared/models/moderator';

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

    disable(username: string) {
        return this.moderatorModel.findOneAndUpdate(
            { username },
            { $set: { disabled: true } },
            { new: true }
        )
        .exec();
    }
}
