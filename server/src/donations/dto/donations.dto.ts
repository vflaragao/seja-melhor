import { ActivityCollection } from "@models/fields/activity";
import { ItemDTO } from "products/dto/item.dto";
import { Address } from "@models/fields/address";
import { DonationStatus, Donation } from "@models/donation";
import { Account } from "auth/jwt.interface";
import { Types } from "mongoose";
import { Objects } from "@helpers/object";
import { Dates } from "@helpers/date";
import { Item } from "@models/fields/item";

export class DonationStats {
    constructor (
        public product?: string,
        public total?: number,
        public collected?: number,
    ) {}
}

export class DonationProgress {
    constructor (
        public product?: string,
        public donations?: number,
    ) {}
}

export interface DonationDTO {
    donator: Types.ObjectId;
    target: Types.ObjectId;
    targetSource: ActivityCollection;
    collectPoint: Types.ObjectId;
    items: Item[];
    status: DonationStatus;
    expiresAt: Date;
}

export class DonationCreateDTO {
    constructor(
        public target?: Types.ObjectId,
        public targetSource?: ActivityCollection,
        public collectPoint?: Types.ObjectId,
        public items?: ItemDTO[]
    ) {}

    toModel(account: Account): DonationDTO {
        return {
            target: this.target,
            targetSource: this.targetSource,
            donator: account.user,
            collectPoint: this.collectPoint,
            items: this.items.map(item => Objects.instance(item, ItemDTO).toModel()),
            expiresAt: Dates.add(1, 'day').toDate(),
            status: DonationStatus.PENDING
        }
    }
}

export interface DonationGetDTO {
    donator: string;
    target: string;
    collectPoint: Address;
    items: ItemDTO[];
    status: DonationStatus;
}