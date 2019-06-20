import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '@models/user';
import { UsersDTO } from './dto/users.dto';

import { Database } from '@helpers/database';

@Injectable()
export class UsersService {

    constructor (
        @InjectModel('User')
        private readonly userModel: Model<User>
    ) {}

    save(payload: UsersDTO) {
        const user = new this.userModel(payload);
        return user.save();
    }

    list(query: string = '') {
        const condition = Database.search(['name', 'email'], query);
        return this.userModel.find(condition)
            .sort({ name: 1 })
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.userModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: UsersDTO) {
        return this.userModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
