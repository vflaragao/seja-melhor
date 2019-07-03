import { Item } from './fields/item';

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