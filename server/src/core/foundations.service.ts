import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UserCreateDTO } from '../users/dto/users.dto';

import { Foundation } from '@models/foundation';
import { Collaborator, Role } from '@models/fields/collaborator';
import { FoundationCreateDTO, FoundationUpdateDTO } from '../foundations/dto/foundations.dto';


/** Only normal users can be assign as collaborator */
@Injectable()
export class FoundationsService {

    constructor(
        private readonly userService: UsersService,
        @InjectModel('Foundation')
        private readonly foundationModel: Model<Foundation>,
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
}
