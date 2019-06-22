import { Types } from "mongoose";

import { Address } from "@models/fields/address";
import { Authorization } from "@models/fields/authorization";

export interface CollectPointDTO {
    target: Types.ObjectId;
    targetSource: string;
    creator: Types.ObjectId;
    creatorSource: string;
    address: Address;
    renewable: boolean;
    renewalDay: number;
    expiresAt: Date;
    disabled: boolean;
    authorization: Authorization;
}