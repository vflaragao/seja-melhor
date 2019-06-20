import { Schema, Document } from 'mongoose';

import { Colaborator, Colaboratorchema } from './fields/colaborator';
import { AddressSchema, Address } from './fields/address';
import { OperatingInfoSchema, OperatingInfo } from './fields/operating-info';

export interface Foundation extends Document {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    users: Colaborator[];
    operatingInfo: OperatingInfo;
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
    phone: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: {
            unique: true
        }
    },
    operatingInfo: {
        type: OperatingInfoSchema
    },
    address: {
        type: AddressSchema,
        required: true
    },
    users: {
        type: [Colaboratorchema],
        required: true
    }
});
