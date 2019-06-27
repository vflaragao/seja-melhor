export class User {
    name: string;
    phone: string;
    email: string;
    password?: string;
    disabled: boolean;

    constructor () {}
}

export interface UserDTO {
    name: string;
    phone: string;
    email: string;
    disabled: boolean;
}