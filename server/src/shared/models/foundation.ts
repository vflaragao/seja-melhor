import { Schema, Document } from 'mongoose';

import { Collaborator, Collaboratorchema } from './fields/collaborator';
import { AddressSchema, Address } from './fields/address';
import { OperatingInfoSchema, OperatingInfo } from './fields/operating-info';
import { Authorization, AuthorizationSchema } from './fields/authorization';

export interface Foundation extends Document {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    users: Collaborator[];
    operatingInfo: OperatingInfo;
    authorization: Authorization;
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
        type: [Collaboratorchema],
        required: true
    },
    authorization: {
        type: AuthorizationSchema
    }
});
