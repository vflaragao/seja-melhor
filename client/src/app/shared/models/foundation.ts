import { ActionCategory } from './campaign';

import { Address } from './fields/address';
import { Credentials } from './fields/credentials';
import { OperatingInfo } from './fields/operating-info';

export class Foundation {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
    address: Address;
    credentials: Credentials;
    operatingInfo: OperatingInfo;

    constructor () {
        this.address = new Address();
        this.credentials = new Credentials();
        this.operatingInfo = new OperatingInfo();
    }
}

export interface FoundationDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
    address: Address;
}