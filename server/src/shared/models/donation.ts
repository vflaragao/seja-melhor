import { Schema, Types } from 'mongoose';
import { Item, ItemSchema } from './fields/item';

export enum DonationStatus {
    PENDING = 'PENDING',
    EXPIRED = 'EXPIRED',
    CANCELED = 'CANCELED',
    DONATED = 'DONATED',
    SENT = 'SENT',
    RECEIVED = 'RECEIVED'
}

export const DonationStatusValues = [
    DonationStatus.PENDING,
    DonationStatus.DONATED,
    DonationStatus.SENT,
    DonationStatus.RECEIVED,
    DonationStatus.CANCELED,
    DonationStatus.EXPIRED,
];

export interface Donation {
    donator: string;
    target: string;
    targetSource: string;
    collectPoint: string;
    items: Item[];
    status: DonationStatus;
    expiresAt: Date;
}

export const DonationSchema = new Schema({
    donator: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    target: {
        type: Types.ObjectId,
        required: true,
        refPath: 'targetSource'
    },
    targetSource: {
        type: String,
        required: true,
        enum: ['Campaign', 'Goal']
    },
    collectPoint: {
        type: Types.ObjectId,
        required: true,
        ref: 'CollectPoint'
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: DonationStatusValues
    },
    expiresAt: {
        type: Date,
        required: true
    }
});
