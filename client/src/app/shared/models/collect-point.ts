import { Address } from './fields/address';
import { Authorization } from './fields/authorization';

export interface CollectPointDTO {
    target: string;
    targetSource: string;
    creator: string;
    creatorSource: string;
    address: Address;
    renewable: boolean;
    renewalDay: number;
    expiresAt: Date;
    disabled: boolean;
    authorization: Authorization;
}