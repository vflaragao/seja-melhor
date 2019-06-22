import { ProductType } from './product';

import { Item } from './fields/item';
import { Authorization } from './fields/authorization';

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
    expiresAt: Date;
    authorization: Authorization;
}