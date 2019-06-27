import { Address } from '@models/fields/address';
import { ActionCategory } from '@models/foundation';
import { Credentials } from '@models/fields/credentials';
import { Collaborator } from '@models/fields/collaborator';
import { OperatingInfo } from '@models/fields/operating-info';

export class FoundationCreateDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    category: ActionCategory;
    credentials: Credentials;
    operatingInfo: OperatingInfo;
}

// tslint:disable-next-line:max-classes-per-file
export class FoundationUpdateDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    users: Collaborator[];
    category: ActionCategory;
    operatingInfo: OperatingInfo;

    fromCreateDTO(payload: FoundationCreateDTO) {
        this.name = payload.name;
        this.cnpj = payload.cnpj;
        this.email = payload.email;
        this.phone = payload.phone;
        this.address = payload.address;
        this.category = payload.category;
        this.operatingInfo = payload.operatingInfo;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class FoundationGetDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    category: ActionCategory;
    operatingInfo: OperatingInfo;
}
