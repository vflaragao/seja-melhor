import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '@models/user';
import { UserDTO, UserCreateDTO } from './dto/users.dto';

import { Database } from '@helpers/database';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
    ) {}

    save(payload: UserCreateDTO): Promise<User> {
        const user = new this.userModel(payload);
        return user.save();
    }

    getByEmail(email: string) {
        return this.userModel.findOne({ email }).exec()
    }

    async existsByEmail(email: string) {
        const exists = await this.userModel.findOne({ email }).exec();
        return !!exists;
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

    update(id: Types.ObjectId, payload: UserDTO) {
        return this.userModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true },
        )
        .exec();
    }
}
