import { Schema } from 'mongoose';

export class Moderator {
    name: string;
    username: string;
    password: string;
}

export const ModeratorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});
