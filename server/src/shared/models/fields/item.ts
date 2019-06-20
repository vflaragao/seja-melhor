import { SchemaDefinition, Types } from "mongoose";

export interface Item {
    product: string;
    qtd: number;
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
    }
};