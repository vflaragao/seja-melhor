import { AddressSchema, Address } from './fields/address';
import { Schema, Types } from 'mongoose';

export interface Foundation {
    name: string;
    cnpj: string;
    email: string;
    address: Address;
    users: string[];
}

export const FoundationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    cnpj: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: AddressSchema,
        required: true
    },
    users: {
        type: [Types.ObjectId],
        required: true
    }
});
