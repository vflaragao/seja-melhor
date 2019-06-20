import { SchemaDefinition } from "mongoose";

export interface Address {
    cep: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    state: string;
    city: string;
}

export const AddressSchema: SchemaDefinition = {
    cep: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    complement: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
}