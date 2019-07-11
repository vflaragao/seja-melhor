import { Model, Types } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CollectPoint } from '@models/collect-point';
import { CollectPointCreateDTO } from '../collect-points/dto/collect-point.dto';
import { Account } from 'auth/jwt.interface';
import { ActivityCollection } from '@models/fields/activity';
import { CampaignsService } from './campaigns.service';
import { GoalsService } from './goals.service';

@Injectable()
export class CollectPointsService {

    constructor (
        @InjectModel('CollectPoint')
        private readonly collectPointModel: Model<CollectPoint>,
        private readonly goalService: GoalsService,
        @Inject(forwardRef(() => CampaignsService))
        private readonly campaignService: CampaignsService,
    ) {}

    async save(payload: CollectPointCreateDTO, account: Account) {
        const target = payload.targetSource === ActivityCollection.CAMPAIGN
            ? await this.campaignService.get(payload.target)
            : await this.goalService.get(payload.target);
        const collectPoint = new this.collectPointModel(payload.toModel(account, target));
        return collectPoint.save();
    }

    list() {
        return this.collectPointModel.find()
            .sort({ renewalDay: 1 })
            .exec();
    }

    listByUser(id: Types.ObjectId) {
        return this.collectPointModel.find({
                creator: id,
                creatorSource: 'User',
                disabled: false,
            })
            .select('address operatingInfo renewalDay headOffice expiresAt authorization')
            .exec();
    }
    
    listByFoundation(id: Types.ObjectId) {
        return this.collectPointModel.find({
                creator: id,
                creatorSource: 'Foundation',
                disabled: false,
            })
            .select('address operatingInfo renewalDay headOffice expiresAt authorization')
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.collectPointModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: CollectPointCreateDTO) {
        return this.collectPointModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
