import { SchemaDefinition, Types } from 'mongoose';

export enum Role {
    MANAGER = 'MANAGER',
    SECRETARY = 'SECRETARY',
}

export const RoleValues = [
    Role.MANAGER,
    Role.SECRETARY,
];

export class CollaboratorDTO {
    constructor(
        public role?: Role,
        public name?: string,
        public email?: string,
        public user?: Types.ObjectId,
    ) {}
}

export interface Collaborator {
    user: Types.ObjectId;
    role: Role;
}

export const Collaboratorchema: SchemaDefinition = {
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: RoleValues,
    },
};
