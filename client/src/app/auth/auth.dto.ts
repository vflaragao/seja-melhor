import { Role } from '@models/fields/collaborator';

export interface Account {
    user: string;
    _id: string;
    name: string;
    role: Role;
    email: string;
    default: boolean;
    institutional: boolean;
}

export interface AccessToken {
    accessToken: string;
}
