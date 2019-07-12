export enum Role {
    MANAGER = 'MANAGER',
    SECRETARY = 'SECRETARY'
}

export const RoleValues = [
    Role.MANAGER,
    Role.SECRETARY
];

export class Collaborator {
    user: string;
    name: string;
    email: string;
    role: Role;

    constructor() {}
}
