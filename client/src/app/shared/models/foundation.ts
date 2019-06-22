import { Address } from './fields/address';
import { Collaborator } from './fields/collaborator';
import { Authorization } from './fields/authorization';
import { OperatingInfo } from './fields/operating-info';

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