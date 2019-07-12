import { ActionCategory } from './campaign';

import { Address } from './fields/address';
import { Credentials } from './fields/credentials';
import { Collaborator } from './fields/collaborator';
import { OperatingInfo } from './fields/operating-info';

export class FoundationCreateDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
    address: Address;
    credentials: Credentials;
    operatingInfo: OperatingInfo;

    constructor() {
        this.address = new Address();
        this.credentials = new Credentials();
        this.operatingInfo = new OperatingInfo();
    }
}

export class FoundationUpdateDTO {
    _id: string;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    category: ActionCategory;
    operatingInfo: OperatingInfo;

    constructor() {
        this.address = new Address();
        this.operatingInfo = new OperatingInfo();
    }
}

export class FoundationGetDTO {
    _id: string;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    category: ActionCategory;
    operatingInfo: OperatingInfo;

    constructor() {
        this.address = new Address();
        this.operatingInfo = new OperatingInfo();
    }
}
