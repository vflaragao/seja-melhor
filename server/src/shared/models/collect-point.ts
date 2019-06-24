import { Schema, Types, Document } from 'mongoose';

import { OperatingInfo, OperatingInfoSchema } from './fields/operating-info';
import { Address, AddressSchema } from './fields/address';
import { AuthorizationSchema, Authorization } from './fields/authorization';

export interface CollectPoint extends Document {
    target: Types.ObjectId;
    targetSource: string;
    creator: Types.ObjectId;
    creatorSource: string;
    headOffice: boolean;
    address: Address;
    renewable: boolean;
    renewalDay: number;
    expiresAt: Date;
    disabled: boolean;
    operatingInfo: OperatingInfo;
    authorization: Authorization
}

export const CollectPointSchema = new Schema({
    target: {
        type: Types.ObjectId,
        required: true,
        refPath: 'targetSource'
    },
    targetSource: {
        type: String,
        required: true,
        enum: ['Goal', 'Campaign']
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        refPath: 'creatorSource'
    },
    creatorSource: {
        type: String,
        required: true,
        enum: ['User', 'Foundation']
    },
    headOffice: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: AddressSchema,
        required: true
    },
    renewable: {
        type: Boolean
    },
    renewalDay: {
        type: Number
    },
    expiresAt: {
        type: Date
    },
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    operatingInfo: {
        type: OperatingInfoSchema,
        required: true
    },
    authorization: {
        type: AuthorizationSchema
    }
});
