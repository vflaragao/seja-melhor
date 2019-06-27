import { Schema, Document } from 'mongoose';
import { hashSync, compareSync } from 'bcryptjs';

export interface Moderator extends Document {
    name: string;
    username: string;
    password: string;
    disabled: boolean;
}

const ModeratorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        uppercase: true,
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        index: {
            unique: true,
        },
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

ModeratorSchema.pre<Moderator>('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = hashSync(this.password);
    next();
})
ModeratorSchema.methods.comparePassword = function(password: string) {
    return compareSync(password, this.password);
}
ModeratorSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.password;
        return ret;
    }
});
export { ModeratorSchema };
