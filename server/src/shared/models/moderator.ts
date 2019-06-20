import { Schema, Document } from 'mongoose';

export interface Moderator extends Document {
    name: string;
    username: string;
    password: string;
    disabled: boolean;
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false
    }
});
