import { Address } from '@models/fields/address';
import { Colaborator } from '@models/fields/colaborator';
import { OperatingInfo } from '@models/fields/operating-info';

export interface FoundationsDTO {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: Address;
    users: Colaborator[];
    operatingInfo: OperatingInfo;
}
