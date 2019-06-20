import { SchemaDefinition } from "mongoose";

export interface OperatingInfo {
    weekend: boolean;
    startTime: Date;
    endTime: Date;
}

export const OperatingInfoSchema: SchemaDefinition = {
    weekend: {
        type: Boolean
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    }
};