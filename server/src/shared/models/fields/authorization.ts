import { SchemaDefinition, Types } from "mongoose";

export enum AuthorCollection {
    USER = 'User',
    FOUNDATION = 'Foundation',
    MODERATOR = 'Moderator',
}

export interface Authorization {
    author: Types.ObjectId;
    authorSource: string;
    time: Date;
}

export const AuthorizationSchema: SchemaDefinition = {
    author: {
        type: Types.ObjectId,
        required: true,
        refPath: 'authorSource'
    },
    authorSource: {
        type: String,
        required: true,
        enum: [
            AuthorCollection.USER,
            AuthorCollection.FOUNDATION,
            AuthorCollection.MODERATOR,
        ]
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
}