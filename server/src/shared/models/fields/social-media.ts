import { SchemaDefinition } from "mongoose";

export interface SocialMedia {
    site: string;
    facebook: string;
    instagram: string;
    twitter: string;
}

export const SocialMediaSchema: SchemaDefinition = {
    site: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    }
};