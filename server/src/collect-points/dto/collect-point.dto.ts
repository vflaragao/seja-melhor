import { Types } from "mongoose";

import { Account } from "auth/jwt.interface";

import { Goal, GoalSchema } from "@models/goal";
import { Campaign } from "@models/campaign";

import { Address } from "@models/fields/address";
import { OperatingInfo } from "@models/fields/operating-info";
import { ActivityCollection } from "@models/fields/activity";
import { Authorization, AuthorCollection } from "@models/fields/authorization";

export interface CollectPointDTO {
    target: Types.ObjectId;
    targetSource: ActivityCollection;
    creator: Types.ObjectId;
    creatorSource: AuthorCollection;
    headOffice: boolean;
    renewable: boolean;
    expiresAt: Date;
    address: Address;
    operatingInfo: OperatingInfo;
    disabled?: boolean;
    authorization?: Authorization;
}

export class CollectPointCreateDTO {
    target: Types.ObjectId;
    targetSource: ActivityCollection;
    address: Address;
    operatingInfo: OperatingInfo;
    renewable: boolean;
    expiresAt: Date;

    constructor() {}

    toModel(account: Account, target: Campaign | Goal): CollectPointDTO {
        let authorization = null;
        const source = account.institutional
            ? AuthorCollection.FOUNDATION
            : AuthorCollection.USER;
        const headOffice = target.creator.equals(account._id);
        if (headOffice) {
            authorization = {
                author: account._id,
                authorSource: source,
                time: new Date()
            }
        };
        return {
            target: this.target,
            targetSource: this.targetSource,
            creator: account._id,
            creatorSource: source,
            headOffice: headOffice,
            renewable: this.renewable,
            expiresAt: this.expiresAt,
            address: this.address,
            operatingInfo: this.operatingInfo,
            authorization: authorization
        }
    }
}