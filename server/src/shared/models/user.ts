import { Schema } from 'mongoose';

export class User {
    name: string;
    phone: string;
    cpf: string;
    username: string;
    password: string;
}

export const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
    },
    cpf: {
        type: String,
        trim: true,
        minlength: 11,
        maxlength: 11,
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
