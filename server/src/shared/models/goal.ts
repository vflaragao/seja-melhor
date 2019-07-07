import { Schema, Types, Document } from 'mongoose';

import { ItemSchema, Item } from './fields/item';
import { ProductTypeValues, ProductType } from './product';

export interface Goal extends Document {
    renewalDay: number;
    disabled: boolean;
    creator: Types.ObjectId;
    items: Item[];
    types: ProductType[];
}

export const GoalSchema = new Schema({
    renewalDay: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        ref: 'Foundation'
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    types: {
        type: [String],
        required: true,
        enum: ProductTypeValues
    }
});
