import { Schema, Types, Document } from 'mongoose';

import { Item, ItemSchema } from './fields/item';
import { ProductTypeValues, ProductType } from './product';

export interface Campaign extends Document {
    tile: string;
    description: string;
    ttl: number;
    items: Item[];
    types: ProductType[];
    creator: Types.ObjectId;
    creatorSource: string;
    disabled: boolean;
    expiresAt: Date;
}

export const CampaignSchema = new Schema({
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
        enum: ['User', 'Foundation']
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});
