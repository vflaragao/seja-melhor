import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable, forwardRef, Inject } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserCreateDTO } from '../users/dto/users.dto';
import { Collaborator, CollaboratorDTO, Role } from '@models/fields/collaborator';

import { Foundation } from '@models/foundation';
import { Account } from 'auth/jwt.interface';
import {
    FoundationCreateDTO,
    FoundationUpdateDTO,
} from '../foundations/dto/foundations.dto';

/** Only normal users can be assign as collaborator */
@Injectable()
export class FoundationsService {

    constructor(
        @InjectModel('Foundation')
        private readonly foundationModel: Model<Foundation>,
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
    ) {}

    async save(payload: FoundationCreateDTO) {
        const manager: Collaborator = { user: null, role: Role.MANAGER };
        let user = new UserCreateDTO(
            payload.name,
            payload.phone,
            payload.credentials.email,
            payload.credentials.password,
            true,
        );
        user = await this.userService.save(user);
        manager.user = user._id;
        const update = new FoundationUpdateDTO();
        update.fromCreateDTO(payload);
        update.users = [manager];
        const foundation = new this.foundationModel(update);
        return foundation.save();
    }

    list(query: string) {
        const queryMatch = new RegExp(query, 'ig');
        return this.foundationModel.find({
            name: queryMatch,
            cnpj: queryMatch,
        })
        .sort({ name: 1 })
        .exec();
    }

    async listCollaborators(id: Types.ObjectId) {
        const foundation = await this.foundationModel.findById(id)
            .select('users')
            .populate('users.user')
            .exec();
        const collaborators = foundation.users.map((col: any) =>
            new CollaboratorDTO(
                col.role,
                col.user.name,
                col.user.email,
                col.user._id,
            ),
        );
        return collaborators;
    }

    getByUser(userID: Types.ObjectId) {
        return this.foundationModel.findOne({ 'users.user': userID })
            .exec();
    }

    listByUser(userID: Types.ObjectId) {
        return this.foundationModel.find({ 'users.user': userID })
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.foundationModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: FoundationUpdateDTO) {
        return this.foundationModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true },
        )
        .exec();
    }

    async saveOrUpdateCollaborator(payload: Collaborator, account: Account) {
        let value: any = { $push: { users: payload } };
        const condition = {
            '_id': new Types.ObjectId(account._id),
            'users.user': new Types.ObjectId(payload.user),
        };
        const exists = await this.foundationModel.findOne(condition).exec();
        if (exists) {
            value = { $set: { 'users.$.role': payload.role } };
        }
        return this.foundationModel.findByIdAndUpdate(
            account._id,
            value,
            { new: true },
        ).exec();
    }

    removeCollaborator(id: Types.ObjectId, account: Account) {
        const condition = {
            '_id': new Types.ObjectId(account._id),
            'users.user': new Types.ObjectId(id),
        };
        return this.foundationModel.findOneAndUpdate(
            condition,
            { $pull: { users: { user: new Types.ObjectId(id) } } },
            { new: true },
        ).exec();
    }
}
