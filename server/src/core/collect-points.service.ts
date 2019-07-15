import { Model, Types } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CollectPoint } from '@models/collect-point';
import { CollectPointCreateDTO } from '../collect-points/dto/collect-point.dto';
import { Account } from 'auth/jwt.interface';
import { ActivityCollection } from '@models/fields/activity';
import { CampaignsService } from './campaigns.service';
import { GoalsService } from './goals.service';
import { AuthorCollection } from '@models/fields/authorization';
import { Database } from '@helpers/database';
import { FoundationsService } from './foundations.service';

@Injectable()
export class CollectPointsService {

    constructor(
        @InjectModel('CollectPoint')
        private readonly collectPointModel: Model<CollectPoint>,
        @Inject(forwardRef(() => GoalsService))
        private readonly goalService: GoalsService,
        @Inject(forwardRef(() => CampaignsService))
        private readonly campaignService: CampaignsService,
        private readonly foundationService: FoundationsService,
    ) {}

    async saveFromActivity(payload: CollectPointCreateDTO, account: Account) {
        const target = payload.targetSource === ActivityCollection.CAMPAIGN
            ? await this.campaignService.get(payload.target)
            : await this.goalService.get(payload.target);
        const collectPoint = new this.collectPointModel(payload.toModel(account, target));
        return collectPoint.save();
    }

    list() {
        return this.collectPointModel.find()
            .select('target targetSource address operatingInfo headOffice expiresAt authorization')
            .exec();
    }

    listByUser(id: Types.ObjectId) {
        return this.collectPointModel.find({
                creator: id,
                creatorSource: AuthorCollection.USER,
                disabled: false,
            })
            .select('target targetSource address operatingInfo renewalDay headOffice expiresAt authorization')
            .exec();
    }
    
    listByFoundation(id: Types.ObjectId) {
        return this.collectPointModel.find({
                creator: id,
                creatorSource: AuthorCollection.FOUNDATION,
                disabled: false,
            })
            .select('target targetSource address operatingInfo renewalDay headOffice expiresAt authorization')
            .exec();
    }
    
    listByCampaign(id: Types.ObjectId, query: string = '') {
        const searchCondition = Database.search([
            'address.cep',
            'address.city',
            'address.state',
            'address.district',
            'address.street',
            'address.number',
            'address.complement',
        ], query);
        return this.collectPointModel.find({
                $and: [
                    { target: new Types.ObjectId(id) },
                    { targetSource: ActivityCollection.CAMPAIGN },
                    { disabled: false },
                    { ...searchCondition },
                ]
            })
            .select('target targetSource address operatingInfo headOffice expiresAt authorization')
            .exec();
    }
    
    listByGoal(id: Types.ObjectId, query: string = '') {
        const searchCondition = Database.search([
            'address.cep',
            'address.city',
            'address.state',
            'address.district',
            'address.street',
            'address.number',
            'address.complement',
        ], query);
        return this.collectPointModel.find({
                $and: [
                    { target: new Types.ObjectId(id) },
                    { targetSource: ActivityCollection.GOAL },
                    { disabled: false },
                    { ...searchCondition },
                ]
            })
            .select('address operatingInfo headOffice expiresAt authorization')
            .exec();
    }

    async get(id: Types.ObjectId) {
        const collectPoint = await this.collectPointModel.findById(id)
            .populate('creator', 'name')
            .exec();
        let target: any = await (collectPoint.targetSource === ActivityCollection.CAMPAIGN
            ? this.campaignService.get(collectPoint.target)
            : this.foundationService.get(collectPoint.target));
        return collectPoint.toGetDTO(target);
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
