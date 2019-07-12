import { Types } from 'mongoose';

import { Role } from '@models/fields/collaborator';

export interface Account {
    user: Types.ObjectId;
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: Role;
    default: boolean;
    institutional: boolean;
}
