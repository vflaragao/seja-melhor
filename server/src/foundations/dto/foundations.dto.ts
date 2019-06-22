import { Address } from '@models/fields/address';
import { Collaborator } from '@models/fields/collaborator';
import { OperatingInfo } from '@models/fields/operating-info';
import { Authorization } from '@models/fields/authorization';

export interface FoundationsDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    users: Collaborator[];
    operatingInfo: OperatingInfo;
    authorization: Authorization;
}
