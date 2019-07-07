import { Role } from '@models/fields/collaborator';

export interface Account {
    user: string;
    _id: string;
    name: string;
    role: Role;
    default: boolean;
    institutional: boolean;
}

export interface AccessToken {
    accessToken: string;
}
