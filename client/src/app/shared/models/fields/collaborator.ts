export enum Role {
    MANAGER = 'MANAGER',
    SECRETARY = 'SECRETARY'
}

export const RoleValues = [
    Role.MANAGER,
    Role.SECRETARY
];

export interface Collaborator {
    user: string;
    role: Role;
}