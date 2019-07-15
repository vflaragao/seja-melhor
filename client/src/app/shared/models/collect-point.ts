import { Address } from './fields/address';
import { Authorization } from './fields/authorization';
import { OperatingInfo } from './fields/operating-info';
import { ActivityCollection } from './fields/activity';

export class CollectPointCreateDTO {
    _id: string;
    target: string;
    targetSource: ActivityCollection;
    address: Address;
    operatingInfo: OperatingInfo;
    expiresAt: Date;

    constructor(){
        this.address = new Address();
        this.operatingInfo = new OperatingInfo();
    }
}

export class CollectPointGetDTO {
    _id: string;
    target: {_id: string, name: string};
    targetSource: ActivityCollection;
    creator: {_id: string, name: string};
    address: Address;
    headOffice: boolean;
    operatingInfo: OperatingInfo;
    expiresAt: Date;

    constructor(){}
}

export class CollectPointDTO {
    _id: string;
    target: string;
    targetSource: ActivityCollection;
    creator: string;
    creatorSource: string;
    headOffice: boolean;
    address: Address;
    expiresAt: Date;
    disabled: boolean;
    operatingInfo: OperatingInfo;
    authorization: Authorization;
}