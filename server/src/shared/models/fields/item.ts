import { SchemaDefinition, Types } from "mongoose";

export enum ItemUnit {
    UNIT = 'UNIT',
    WEIGHT = 'WEIGHT',
}

export const ItemUnitValues = [
    ItemUnit.UNIT,
    ItemUnit.WEIGHT
];

export interface Item {
    product: Types.ObjectId;
    quantity: number;
    unit: ItemUnit;
}

export const ItemSchema: SchemaDefinition = {
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ItemUnitValues
    }
};