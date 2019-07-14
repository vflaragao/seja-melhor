import { Item } from './fields/item';
import { ActivityCollection } from './fields/activity';
import { Address } from './fields/address';

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

export class DonationCreateDTO {
    constructor(
        public target?: string,
        public targetSource?: ActivityCollection,
        public collectPoint?: string,
        public items?: Item[]
    ) {
        this.items = [];
    }
}

export interface DonationGetDTO {
    donator: string;
    target: string;
    collectPoint: Address;
    items: Item[];
    status: DonationStatus;
}