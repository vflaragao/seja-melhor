import { Credentials } from './fields/credentials';

export class User {
    name: string;
    phone: string;
    email: string;
    password?: string;
    disabled: boolean;

    constructor () {}

    toCredentials(): Credentials {
        return {
            email: this.email,
            password: this.password
        };
    }
}

export interface UserDTO {
    _id: string;
    name: string;
    phone: string;
    email: string;
    disabled: boolean;
}