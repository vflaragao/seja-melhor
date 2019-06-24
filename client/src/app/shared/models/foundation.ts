import { ActionCategory } from './campaign';

import { Address } from './fields/address';
import { Collaborator } from './fields/collaborator';
import { Authorization } from './fields/authorization';
import { OperatingInfo } from './fields/operating-info';

export class FoundationsDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    category: ActionCategory;
    address: Address;
    users: Collaborator[];
    operatingInfo: OperatingInfo;
    authorization: Authorization;
}