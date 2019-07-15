import { Model, Types } from 'mongoose';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Database } from '@helpers/database';

import { Account } from 'auth/jwt.interface';
import { CollaboratorDTO } from '../shared/models/fields/collaborator';

import { User } from '@models/user';
import { UserCreateDTO } from '../users/dto/users.dto';

import { FoundationsService } from './foundations.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        @Inject(forwardRef(() => FoundationsService))
        private readonly foundationService: FoundationsService,
    ) {}

    save(payload: UserCreateDTO) {
        const user = new this.userModel(payload);
        return user.save();
    }

    getByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
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

    async listCollaborators(account: Account, query: string = '', limit: number) {
        const searchCondition = Database.search(['name', 'email'], query);
        const collaborators = await this.foundationService.listCollaborators(account._id);
        const condition = {
            $and: [
                { ...searchCondition },
                { institutional: false },
                { email: { $nin: collaborators.map(({ email }) => email) } },
            ],
        };
        const users = await this.userModel.find(condition)
            .sort({ name: 1 })
            .limit(Number(limit))
            .exec();
        const availableUsers = users.map(user =>
            new CollaboratorDTO(
                null,
                user.name,
                user.email,
                user._id,
            ),
        );
        return availableUsers;
    }

    get(id: Types.ObjectId) {
        return this.userModel.findById(id).exec();
    }

    update(id: Types.ObjectId, payload: UserCreateDTO) {
        return this.userModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true },
        )
        .exec();
    }
}
