import { Schema, Types, Document } from 'mongoose';

import { ActionCategory, ActionCategoryValues } from './foundation';

import { Item, ItemSchema } from './fields/item';
import { ProductTypeValues, ProductType } from './product';
import { Authorization, AuthorizationSchema, AuthorCollection } from './fields/authorization';
import { CollectPointCreateDTO } from 'collect-points/dto/collect-point.dto';
import { ActivityCollection } from './fields/activity';
import { Address } from './fields/address';
import { OperatingInfo } from './fields/operating-info';
import { CampaignGetDTO } from 'campaigns/dto/campaign.dto';
import { ItemDTO } from 'products/dto/item.dto';

export interface Campaign extends Document {
    title: string;
    description: string;
    ttl: number;
    items: Item[];
    types: ProductType[];
    creator: Types.ObjectId;
    creatorSource: string;
    disabled: boolean;
    initAt: Date;
    expiresAt: Date;
    category: ActionCategory;
    authorization: Authorization;

    toGetDTO(): CampaignGetDTO;
    asHeadOffice(address: Address, operatingInfo: OperatingInfo): CollectPointCreateDTO;
}

const CampaignSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000
    },
    ttl: {
        type: Number,
        required: true
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    types: {
        type: [String],
        required: true,
        enum: ProductTypeValues
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
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    initAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ActionCategoryValues
    },
    authorization: {
        type: AuthorizationSchema
    }
});

CampaignSchema.methods.toGetDTO = function () {
    return new CampaignGetDTO(
        this._id,
        this.title,
        this.description,
        this.ttl,
        this.initAt,
        this.expiresAt,
        this.category,
        this.types,
        this.creator,
        this.items.map((item: any) =>
            new ItemDTO(
                item.product._id,
                item.product.name,
                item.product.type,
                item.quantity,
                item.unit,
            ),
        ),
    );
}
CampaignSchema.methods.asHeadOffice = function(address: Address, operatingInfo: OperatingInfo): CollectPointCreateDTO {
    const createCollectPoint = new CollectPointCreateDTO();
    createCollectPoint.target = this._id;
    createCollectPoint.targetSource = ActivityCollection.CAMPAIGN;
    createCollectPoint.address = address;
    createCollectPoint.operatingInfo = operatingInfo;
    createCollectPoint.expiresAt = this.expiresAt;
    return createCollectPoint;
}

export { CampaignSchema };
