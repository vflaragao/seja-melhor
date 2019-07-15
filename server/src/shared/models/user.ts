import { Schema, Document, Types } from 'mongoose';

import { hashSync, compareSync } from 'bcryptjs';
import { Account } from 'auth/jwt.interface';
import { SocialMedia, SocialMediaSchema } from './fields/social-media';
import { UserGetDTO } from 'users/dto/users.dto';

export interface User extends Document {
    name: string;
    phone: string;
    email: string;
    password: string;
    disabled?: boolean;
    institutional: boolean;
    defaultAccount: Types.ObjectId;
    social: SocialMedia;

    comparePassword(password: string): string;
    asAccount(): Account;
    toGetDTO(): UserGetDTO;
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
    defaultAccount: {
        type: Types.ObjectId,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    social: {
        type: SocialMediaSchema,
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
UserSchema.methods.toGetDTO = function() {
    return new UserGetDTO(
        this._id,
        this.name,
        this.phone,
        this.email,
    );
}
UserSchema.methods.asAccount = function() {
    if (this.institutional) {
        return null;
    }
    return {
        user: this._id,
        _id: this._id,
        name: this.name,
        email: this.email,
        institutional: false,
        default: this.defaultAccount || this._id,
    } as Account;
};
UserSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    },
});

export { UserSchema };
