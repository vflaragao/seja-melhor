import { Model, Types } from 'mongoose';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Objects } from '@helpers/object';
import { Database } from '@helpers/database';

import { CampaignCreateDTO } from '../campaigns/dto/campaign.dto';
import { CollectPointCreateDTO } from 'collect-points/dto/collect-point.dto';

import { Account } from 'auth/jwt.interface';
import { Campaign } from '@models/campaign';
import { Foundation } from '@models/foundation';

import { FoundationsService } from './foundations.service';
import { CollectPointsService } from './collect-points.service';

@Injectable()
export class CampaignsService {

    constructor (
        @InjectModel('Campaign')
        private readonly campaignModel: Model<Campaign>,
        private readonly foundationService: FoundationsService,
        @Inject(forwardRef(() => CollectPointsService))
        private readonly collectPointService: CollectPointsService,
    ) {}

    async save(payload: CampaignCreateDTO, account: Account) {
        let foundation: Foundation = null;
        payload = Objects.instance(payload, CampaignCreateDTO);
        if (account.institutional) {
            foundation = await this.foundationService.get(account._id);
        }
        const campaign = new this.campaignModel(payload.toModel(account, foundation));
        const result = await campaign.save();
        if (payload.createCollectPoint) {
            let collectPoint: CollectPointCreateDTO;
            if (account.institutional) {
                collectPoint = result.asHeadOffice(
                    foundation.address,
                    foundation.operatingInfo
                );
            } else {
                collectPoint = result.asHeadOffice(
                    payload.collectPoint.address,
                    payload.collectPoint.operatingInfo,
                );
            }
            await this.collectPointService.save(collectPoint, account);
        }
    }

    list(query: string) {
        const condition = Database.search(['name', 'cnpj'], query);
        return this.campaignModel.find(condition)
            .sort({ name: 1 })
            .exec();
    }

    listByUser(id: Types.ObjectId) {
        return this.campaignModel.find({
                creator: id,
                creatorSource: 'User',
                disabled: false,
            })
            .select('title description category expiresAt authorization')
            .exec();
    }
    
    listByFoundation(id: Types.ObjectId) {
        return this.campaignModel.find({
                creator: id,
                creatorSource: 'Foundation',
                disabled: false,
            })
            .select('title description expiresAt authorization')
            .exec();
    }

    get(id: Types.ObjectId) {
        return this.campaignModel.findById(id)
            .exec();
    }

    update(id: Types.ObjectId, payload: CampaignCreateDTO) {
        return this.campaignModel.findByIdAndUpdate(
            id,
            { $set: { ...payload } },
            { new: true }
        )
        .exec();
    }
}
