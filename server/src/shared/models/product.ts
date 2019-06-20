import { Schema, Types } from 'mongoose';

export enum ProductType {
    TOY = 'TOY',
    FOOD = 'FOOD',
    REMEDY = 'REMEDY',
    CLOTHE = 'CLOTHE',
}

export const ProductTypeValues = [
    ProductType.TOY,
    ProductType.FOOD,
    ProductType.REMEDY,
    ProductType.CLOTHE
];

export interface Product {
    name: string;
    type: ProductType;
    creator: string;
    disabled: boolean;
}

export const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    type: {
        type: String,
        enum: ProductTypeValues,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        refPath: 'Foundation',
        required: true
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
    }
});
