import { Address } from './fields/address';
import { Authorization } from './fields/authorization';
import { OperatingInfo } from './fields/operating-info';

export interface CollectPointGetDTO {
    target: string;
    creator: string;
    address: Address;
    headOffice: boolean;
    operatingInfo: OperatingInfo;
    expiresAt: Date;
}

export class CollectPointDTO {
    target: string;
    targetSource: string;
    creator: string;
    creatorSource: string;
    headOffice: boolean;
    address: Address;
    expiresAt: Date;
    disabled: boolean;
    operatingInfo: OperatingInfo;
    authorization: Authorization;
}