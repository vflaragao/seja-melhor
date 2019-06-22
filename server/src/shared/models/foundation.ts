import { Schema, Document } from 'mongoose';

import { Collaborator, Collaboratorchema } from './fields/collaborator';
import { AddressSchema, Address } from './fields/address';
import { OperatingInfoSchema, OperatingInfo } from './fields/operating-info';
import { Authorization, AuthorizationSchema } from './fields/authorization';

export enum ActionCategory {
    OLD = 'OLD',
    ANIMALS = 'ANIMALS',
    CHILDREN = 'CHILDREN',
    PATIENTS = 'PATIENTS',
    HOMELESS = 'HOMELESS',
    NONE = 'NONE'
}

export const ActionCategoryValues = [
    ActionCategory.OLD,
    ActionCategory.ANIMALS,
    ActionCategory.CHILDREN,
    ActionCategory.PATIENTS,
    ActionCategory.HOMELESS,
    ActionCategory.OLD,
];

export interface Foundation extends Document {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
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
    category: {
        type: String,
        required: true,
        enum: ActionCategoryValues
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
