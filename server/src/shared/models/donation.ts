import { Schema, Types } from 'mongoose';

export enum DonationStatus {
    PENDENTE = 'PENDENTE',
    EXPIRADO = 'EXPIRADO',
    CANCELADO = 'CANCELADO',
    DOADO = 'DOADO',
    ENVIADO = 'ENVIADO',
    ENTREGUE = 'ENTREGUE'
}

export const DonationStatusValues = [
    DonationStatus.PENDENTE,
    DonationStatus.EXPIRADO,
    DonationStatus.CANCELADO,
    DonationStatus.DOADO,
    DonationStatus.ENVIADO,
    DonationStatus.ENTREGUE
];

export interface Donation {
    donator: string;
    target: string;
    targetSource: string;
    collectPoint: string;
    status: DonationStatus;
    expiresAt: Date;
}

export const DonationSchema = new Schema({
    donator: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    target: {
        type: Types.ObjectId,
        required: true,
        refPath: 'targetSource'
    },
    targetSource: {
        type: String,
        required: true,
        enum: ['Campaign', 'Goal']
    },
    collectPoint: {
        type: Types.ObjectId,
        required: true,
        ref: 'CollectPoint'
    },
    status: {
        type: String,
        required: true,
        enum: DonationStatusValues
    },
    expiresAt: {
        type: Date,
        required: true
    }
});
