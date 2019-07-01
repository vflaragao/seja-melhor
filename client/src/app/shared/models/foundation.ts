import { ActionCategory } from './campaign';

import { ProductType } from './product';
import { Address } from './fields/address';
import { Credentials } from './fields/credentials';
import { Collaborator } from './fields/collaborator';
import { OperatingInfo } from './fields/operating-info';

export interface GoalStatistics {
    type: ProductType;
    progress: number;
}

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
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
    address: Address;
    users: Collaborator[];
    operatingInfo: OperatingInfo;

    constructor() {
        this.users = [];
        this.address = new Address();
        this.operatingInfo = new OperatingInfo();
    }
}

export interface FoundationGetDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    category: ActionCategory;
    operatingInfo: OperatingInfo;
}
