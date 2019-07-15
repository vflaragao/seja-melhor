import { Schema, Types, Document } from 'mongoose';

import { ItemSchema, Item } from './fields/item';
import { ProductTypeValues, ProductType } from './product';
import { Address } from './fields/address';
import { OperatingInfo } from './fields/operating-info';
import { CollectPointCreateDTO } from 'collect-points/dto/collect-point.dto';
import { ActivityCollection } from './fields/activity';
import { GoalGetDTO } from 'goals/dto/goal.dto';

export interface Goal extends Document {
    disabled: boolean;
    creator: Types.ObjectId;
    items: Item[];
    types: ProductType[];

    asHeadOffice(address: Address, operatingInfo: OperatingInfo): CollectPointCreateDTO;
    toGetDTO(): GoalGetDTO;
}

const GoalSchema = new Schema({
    disabled: {
        type: Boolean,
        default: false,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        ref: 'Foundation'
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    types: {
        type: [String],
        required: true,
        enum: ProductTypeValues
    }
});

GoalSchema.methods.toGetDTO = function () {
    return new GoalGetDTO(
        this._id,
        this.types,
        this.creator,
    );
}
GoalSchema.methods.asHeadOffice = function(address: Address, operatingInfo: OperatingInfo): CollectPointCreateDTO {
    const createCollectPoint = new CollectPointCreateDTO();
    createCollectPoint.target = this._id;
    createCollectPoint.targetSource = ActivityCollection.GOAL;
    createCollectPoint.address = address;
    createCollectPoint.operatingInfo = operatingInfo;
    return createCollectPoint;
}

export { GoalSchema };
