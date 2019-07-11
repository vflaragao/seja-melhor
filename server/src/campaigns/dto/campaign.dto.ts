import { Types } from "mongoose";

import { ProductType } from "@models/product";
import { ActionCategory, Foundation } from "@models/foundation";

import { Item } from "@models/fields/item";
import { Address } from "@models/fields/address";
import { Authorization, AuthorCollection } from "@models/fields/authorization";

import { Dates } from "@helpers/date";
import { Objects } from "@helpers/object";

import { Account } from "../../auth/jwt.interface";
import { ItemDTO } from "../../products/dto/item.dto";
import { OperatingInfo } from "@models/fields/operating-info";
import { CollectPointDTO } from "collect-points/dto/collect-point.dto";

export interface CampaignDTO {
    title: string;
    description: string;
    ttl: number;
    items: Item[];
    types: ProductType[];
    creator: Types.ObjectId;
    creatorSource: string;
    category: ActionCategory;
    initAt: Date;
    expiresAt: Date;
    disabled?: boolean;
    authorization?: Authorization;
}

export class CampaignCreateDTO {
    _id: string;
    title: string;
    description: string;
    ttl: number;
    items: ItemDTO[];
    initAt: Date;
    category: ActionCategory;
    createCollectPoint: boolean;
    collectPoint: {
        address: Address;
        operatingInfo: OperatingInfo;
    }

    constructor(){}

    toModel(account: Account, foundation: Foundation): CampaignDTO {
        const source = account.institutional
            ? AuthorCollection.FOUNDATION
            : AuthorCollection.USER;
        const category = account.institutional
            ? foundation.category
            : this.category;
        let distinctItemTypes = this.items.map(item => item.type);
        distinctItemTypes = Objects.distinct(distinctItemTypes);
        return {
            title: this.title,
            description: this.description,
            initAt: this.initAt,
            ttl: this.ttl,
            creator: account._id,
            creatorSource: source,
            category: category,
            expiresAt: Dates.add(this.ttl, 'days', this.initAt).toDate(),
            items: this.items.map(item => Objects.instance(item, ItemDTO).toModel()),
            types: distinctItemTypes
        }
    }
}
