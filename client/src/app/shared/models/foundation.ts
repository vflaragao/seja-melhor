import { ActionCategory } from './campaign';

import { Address } from './fields/address';
import { Credentials } from './fields/credentials';
import { SocialMedia } from './fields/social-media';
import { OperatingInfo } from './fields/operating-info';

export class FoundationCreateDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
    address: Address;
    social: SocialMedia;
    credentials: Credentials;
    operatingInfo: OperatingInfo;

    constructor() {
        this.address = new Address();
        this.social = new SocialMedia();
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
    social: SocialMedia;
    category: ActionCategory;
    operatingInfo: OperatingInfo;

    constructor() {
        this.address = new Address();
        this.social = new SocialMedia();
        this.operatingInfo = new OperatingInfo();
    }
}

export class FoundationGetDTO {
    _id: string;
    goal: string;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    social: SocialMedia;
    category: ActionCategory;
    operatingInfo: OperatingInfo;

    constructor() {
        this.address = new Address();
        this.social = new SocialMedia();
        this.operatingInfo = new OperatingInfo();
    }
}
