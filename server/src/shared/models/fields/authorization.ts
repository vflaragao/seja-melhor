import { SchemaDefinition, Types } from "mongoose";

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
        enum: ['User', 'Foundation', 'Moderator']
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
}