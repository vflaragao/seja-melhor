import { Types } from "mongoose";

import { Item } from "@models/fields/item";
import { ProductType } from "@models/product";
import { Authorization } from "@models/fields/authorization";

export interface CampaignDTO {
    tile: string;
    description: string;
    ttl: number;
    items: Item[];
    types: ProductType[];
    creator: Types.ObjectId;
    creatorSource: string;
    disabled: boolean;
    expiresAt: Date;
    authorization: Authorization;
}
