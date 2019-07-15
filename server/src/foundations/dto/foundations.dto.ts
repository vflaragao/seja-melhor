import { Types } from 'mongoose';

import { Address } from '@models/fields/address';
import { ActionCategory } from '@models/foundation';
import { Credentials } from '@models/fields/credentials';
import { Collaborator } from '@models/fields/collaborator';
import { OperatingInfo } from '@models/fields/operating-info';
import { SocialMedia } from '@models/fields/social-media';

export class FoundationCreateDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    social: SocialMedia;
    category: ActionCategory;
    credentials: Credentials;
    operatingInfo: OperatingInfo;

    constructor(){}
}

// tslint:disable-next-line:max-classes-per-file
export class FoundationUpdateDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    social: SocialMedia;
    users: Collaborator[];
    category: ActionCategory;
    operatingInfo: OperatingInfo;

    fromCreateDTO(payload: FoundationCreateDTO) {
        this.name = payload.name;
        this.cnpj = payload.cnpj;
        this.email = payload.email;
        this.phone = payload.phone;
        this.social = payload.social;
        this.address = payload.address;
        this.category = payload.category;
        this.operatingInfo = payload.operatingInfo;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class FoundationGetDTO {
    constructor(
        public _id?: Types.ObjectId,
        public goal?: Types.ObjectId,
        public name?: string,
        public cnpj?: string,
        public email?: string,
        public phone?: string,
        public address?: Address,
        public social?: SocialMedia,
        public category?: ActionCategory,
        public operatingInfo?: OperatingInfo,
    ){}
}
