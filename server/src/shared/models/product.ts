import { Schema, Types, Document } from 'mongoose';

export enum ProductType {
    TOY = 'TOY',
    FOOD = 'FOOD',
    REMEDY = 'REMEDY',
    CLOTHE = 'CLOTHE',
    CLEANING_MATERIAL = 'CLEANING_MATERIAL'
}

export const ProductTypeValues = [
    ProductType.TOY,
    ProductType.FOOD,
    ProductType.REMEDY,
    ProductType.CLOTHE,
    ProductType.CLEANING_MATERIAL,
];

export interface Product extends Document {
    name: string;
    type: ProductType;
    creator: Types.ObjectId;
    disabled: boolean;
}

export const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    type: {
        type: String,
        enum: ProductTypeValues,
        required: true,
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true,
    },
});
