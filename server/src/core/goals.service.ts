import { Model, Types } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Goal } from '@models/goal';
import { GoalCreateDTO } from '../goals/dto/goal.dto';
import { CollectPointsService } from './collect-points.service';
import { Account } from 'auth/jwt.interface';
import { FoundationsService } from './foundations.service';
import { CollectPointCreateDTO } from 'collect-points/dto/collect-point.dto';
import { Objects } from '@helpers/object';
import { ItemDTO } from 'products/dto/item.dto';

@Injectable()
export class GoalsService {

    constructor(
        @InjectModel('Goal')
        private readonly goalModel: Model<Goal>,
        private readonly foundationService: FoundationsService,
        @Inject(forwardRef(() => CollectPointsService))
        private readonly collectPointService: CollectPointsService,
    ) { }

    async save(account: Account, payload: GoalCreateDTO) {
        const foundation = await this.foundationService.get(account._id);
        payload = Objects.instance(payload, GoalCreateDTO);
        const goal = new this.goalModel(payload.toModel(account));
        const result = await goal.save();
        let collectPoint: CollectPointCreateDTO;
        collectPoint = result.asHeadOffice(
            foundation.address,
            foundation.operatingInfo
        );
        await this.collectPointService.saveFromActivity(collectPoint, account);
        return this.getByFoundation(account);
    }

    list() {
        return this.goalModel.find()
            .exec();
    }

    async listCollectPoints(id: Types.ObjectId, query: string) {
        return this.collectPointService.listByGoal(id, query);
    }

    async listItems(id: Types.ObjectId, query: string = '') {
        const goal = await this.goalModel.findById(id)
            .select('items')
            .populate('items.product')
            .exec();
        return goal.items.map((item: any) =>
            new ItemDTO(
                item.product._id,
                item.product.name,
                item.product.type,
                item.quantity,
                item.unit,
            ),
        )
        .filter(item => new RegExp(query, 'ig').test(item.name));
    }

    get(id: Types.ObjectId) {
        return this.goalModel.findById(id)
            .exec();
    }

    async getByFoundation(account: Account) {
        const goal = await this.goalModel.findOne({
            creator: new Types.ObjectId(account._id)
        })
            .populate('items.product')
            .select('-creator')
            .exec();
        if (!goal) {
            return goal;
        }
        return new GoalCreateDTO(
            goal._id,
            goal.disabled,
            goal.items.map((item: any) =>
                new ItemDTO(
                    item.product._id,
                    item.product.name,
                    item.product.type,
                    item.quantity,
                    item.unit,
                ),
            ),
        )
    }

    async update(account: Account, payload: GoalCreateDTO) {
        payload = Objects.instance(payload, GoalCreateDTO);
        const goal = payload.toModel(account);
        goal.types = payload.getTypes();
        await this.goalModel.findOneAndUpdate(
            { creator: new Types.ObjectId(account._id) },
            { $set: { ...payload } },
            { new: true }
        )
            .exec();
        return this.getByFoundation(account);
    }
}
