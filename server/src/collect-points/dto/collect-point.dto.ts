import { Types } from "mongoose";

import { Address } from "@models/fields/address";
import { Authorization } from "@models/fields/authorization";
import { OperatingInfo } from "@models/fields/operating-info";

export interface CollectPointDTO {
    target: Types.ObjectId;
    targetSource: string;
    creator: Types.ObjectId;
    creatorSource: string;
    headOffice: boolean;
    address: Address;
    renewable: boolean;
    renewalDay: number;
    expiresAt: Date;
    disabled: boolean;
    operatingInfo: OperatingInfo;
    authorization: Authorization;
}