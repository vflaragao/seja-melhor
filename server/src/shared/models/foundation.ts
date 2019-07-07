import { Schema, Document, Types } from 'mongoose';

import { Account } from 'auth/jwt.interface';

import { User } from './user';
import { AddressSchema, Address } from './fields/address';
import { Collaborator, Collaboratorchema } from './fields/collaborator';
import { OperatingInfoSchema, OperatingInfo } from './fields/operating-info';
import { Authorization, AuthorizationSchema } from './fields/authorization';

export enum ActionCategory {
    OLD = 'OLD',
    ANIMALS = 'ANIMALS',
    CHILDREN = 'CHILDREN',
    PATIENTS = 'PATIENTS',
    HOMELESS = 'HOMELESS',
    NONE = 'NONE',
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

    asAccount(user: User): Account;
}

const FoundationSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    cnpj: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: {
            unique: true,
        },
    },
    category: {
        type: String,
        required: true,
        enum: ActionCategoryValues,
    },
    operatingInfo: {
        type: OperatingInfoSchema,
    },
    address: {
        type: AddressSchema,
        required: true,
    },
    users: {
        type: [Collaboratorchema],
        required: true,
    },
    authorization: {
        type: AuthorizationSchema,
    },
});

FoundationSchema.methods.asAccount = function(user: User) {
    const collaborator: Collaborator = this.users.find(col => user._id.equals(col.user));
    const defaultAccount = user.institutional ? this._id : this._id === user.defaultAccount;
    return {
        user: user._id,
        _id: this._id,
        name: this.name,
        role: collaborator.role,
        institutional: true,
        default: defaultAccount
    } as Account;
};

export { FoundationSchema };
