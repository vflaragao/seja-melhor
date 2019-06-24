import { Address } from './fields/address';
import { Authorization } from './fields/authorization';
import { OperatingInfo } from './fields/operating-info';

export class CollectPointDTO {
    target: string;
    targetSource: string;
    creator: string;
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