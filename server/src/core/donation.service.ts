import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Donation, DonationStatus } from '@models/donation';
import { DonationCreateDTO, DonationGetDTO } from 'donations/dto/donations.dto';
import { Account } from 'auth/jwt.interface';
import { Objects } from '@helpers/object';
import { Dates } from '@helpers/date';
import { GoalsService } from './goals.service';
import { CampaignsService } from './campaigns.service';
import { ActivityCollection } from '@models/fields/activity';
import { Database } from '@helpers/database';
import { ItemDTO } from 'products/dto/item.dto';

@Injectable()
export class DonationService {
    constructor(
        @InjectModel('Donation')
        private readonly donationModel: Model<Donation>,
        private readonly goalService: GoalsService,
        private readonly campaignService: CampaignsService,
    ) {}

    save(account: Account, payload: DonationCreateDTO) {
        payload = Objects.instance(payload, DonationCreateDTO);
        const donation = new this.donationModel(payload.toModel(account));
        return donation.save();
    }

    async statsByGoal(id: Types.ObjectId) {
        const period = Dates.period(new Date());
        const goal = await this.goalService.get(id);
        const donations = await this.donationModel.find({
            target: new Types.ObjectId(id),
            targetSource: ActivityCollection.GOAL,
            status: DonationStatus.RECEIVED
        })
        .exec();
    }

    statsByCampaign() {

    }

    statsByCollectPoint(id: Types.ObjectId) {

    }

    async listByCollectPoint(id: Types.ObjectId, status?: DonationStatus) {
        const conditions: any = { collectPoint: new Types.ObjectId(id) };
        if (status) {
            conditions.status = status;
        }
        const donations = await this.donationModel.find(conditions)
        .populate('donator')
        .populate('target')
        .populate('collectPoint')
        .populate('items.product')
        .exec();
        return donations.map((donation: any) =>
            new DonationGetDTO(
                donation._id,
                donation.createdAt,
                donation.donator.name,
                donation.target.name,
                donation.collectPoint.address,
                donation.status,
                donation.items.map((item: any) =>
                    new ItemDTO(
                        item.product._id,
                        item.product.name,
                        item.product.type,
                        item.quantity,
                        item.unit,
                    ),
                )
            ),
        );
    }

    changeStatus(id: Types.ObjectId, status: DonationStatus) {
        return this.donationModel.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        )
        .exec()
    }

    changeMultiStatus(ids: Array<Types.ObjectId>, status: DonationStatus) {
        return this.donationModel.updateMany(
            { _id: { $in: ids } },
            { $set: { status } },
            { new: true, multi: true }
        )
        .exec()
    }
}
