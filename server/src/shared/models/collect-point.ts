import { Schema, Types, Document } from 'mongoose';

import { OperatingInfo, OperatingInfoSchema } from './fields/operating-info';
import { Address, AddressSchema } from './fields/address';
import { AuthorizationSchema, Authorization, AuthorCollection } from './fields/authorization';
import { ActivityCollection } from './fields/activity';

export interface CollectPoint extends Document {
    target: Types.ObjectId;
    targetSource: string;
    creator: Types.ObjectId;
    creatorSource: string;
    headOffice: boolean;
    address: Address;
    renewable: boolean;
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
        enum: [ActivityCollection.GOAL, ActivityCollection.CAMPAIGN]
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        refPath: 'creatorSource'
    },
    creatorSource: {
        type: String,
        required: true,
        enum: [AuthorCollection.USER, AuthorCollection.FOUNDATION]
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
        type: Boolean,
        required: true,
        default: false
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
