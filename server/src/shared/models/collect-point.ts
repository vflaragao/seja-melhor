import { Schema, Types, Document } from 'mongoose';

import { OperatingInfo, OperatingInfoSchema } from './fields/operating-info';
import { Address, AddressSchema } from './fields/address';
import { AuthorizationSchema, Authorization, AuthorCollection } from './fields/authorization';
import { ActivityCollection } from './fields/activity';
import { CollectPointGetDTO } from 'collect-points/dto/collect-point.dto';
import { CampaignGetDTO } from 'campaigns/dto/campaign.dto';
import { FoundationGetDTO } from 'foundations/dto/foundations.dto';

export interface CollectPoint extends Document {
    target: Types.ObjectId;
    targetSource: string;
    creator: Types.ObjectId;
    creatorSource: string;
    headOffice: boolean;
    address: Address;
    expiresAt: Date;
    disabled: boolean;
    operatingInfo: OperatingInfo;
    authorization: Authorization;

    toGetDTO(target: FoundationGetDTO | CampaignGetDTO): CollectPointGetDTO;
}

const CollectPointSchema = new Schema({
    target: {
        type: Types.ObjectId,
        required: true,
        refPath: 'targetSource'
    },
    targetSource: {
        type: String,
        required: true,
        enum: [ActivityCollection.GOAL, ActivityCollection.CAMPAIGN]
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        refPath: 'creatorSource'
    },
    creatorSource: {
        type: String,
        required: true,
        enum: [AuthorCollection.USER, AuthorCollection.FOUNDATION]
    },
    headOffice: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: AddressSchema,
        required: true
    },
    expiresAt: {
        type: Date
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    operatingInfo: {
        type: OperatingInfoSchema,
        required: true
    },
    authorization: {
        type: AuthorizationSchema
    }
});

CollectPointSchema.methods.toGetDTO = function(target: FoundationGetDTO | CampaignGetDTO) {
    const targetName = (
        (target as FoundationGetDTO).name || (target as CampaignGetDTO).title
    );
    return new CollectPointGetDTO(
        this._id,
        { _id: target._id, name: targetName },
        this.targetSource,
        this.creator,
        this.address,
        this.headOffice,
        this.operatingInfo,
        this.expiresAt,
        this.authorization,
    );
}

export { CollectPointSchema };
