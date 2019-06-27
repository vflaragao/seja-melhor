import { Schema, Document } from 'mongoose';
import { hashSync, compareSync } from 'bcryptjs';

export interface User extends Document {
    name: string;
    phone: string;
    email: string;
    password: string;
    disabled?: boolean;
    institutional: boolean;

    comparePassword(): string;
}

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: {
            unique: true,
        },
    },
    institutional: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false,
    },
});

UserSchema.pre<User>('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = hashSync(this.password);
    next();
});
UserSchema.methods.comparePassword = function(password: string) {
    return compareSync(password, this.password);
};
UserSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    },
});

export { UserSchema };
