import { ProductType } from './product';

import { Item } from './fields/item';
import { Authorization } from './fields/authorization';
import { Address } from './fields/address';
import { OperatingInfo } from './fields/operating-info';

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
    ActionCategory.NONE,
];

export class CampaignCreateDTO {
    _id: string;
    title: string;
    description: string;
    ttl: number;
    items: Item[];
    initAt: Date;
    category: ActionCategory;
    createCollectPoint: boolean;
    collectPoint: {
        address: Address;
        operatingInfo: OperatingInfo;
    }

    constructor() {
        this.items = [];
        this.collectPoint = {
            address: new Address(),
            operatingInfo: new OperatingInfo(),
        };
    }
}

export class CampaignDTO {
    _id: string;
    title: string;
    description: string;
    ttl: number;
    items: Item[];
    types: ProductType[];
    creator: string;
    creatorSource: string;
    disabled: boolean;
    initAt: Date;
    expiresAt: Date;
    category: ActionCategory;
    authorization: Authorization;
}

export interface CampaignGetDTO {
    title: string;
    description: string;
    ttl: number;
    expiresAt: Date;
    category: ActionCategory;
    creator: {
        name: string;
        site?: string;
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
    types: ProductType[];
}