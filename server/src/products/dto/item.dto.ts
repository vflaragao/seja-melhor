import { Types } from 'mongoose';

import { ProductType } from '@models/product';
import { ItemUnit, Item } from '@models/fields/item';

export class ItemDTO {
    _id?: Types.ObjectId;

    constructor(
        public product?: Types.ObjectId,
        public name?: string,
        public type?: ProductType,
        public quantity?: number,
        public unit?: ItemUnit
    ){}

    toModel(): Item {
        return {
            product: this.product,
            quantity: this.quantity,
            unit: this.unit
        };
    }
}