import { Types } from 'mongoose';

import { ProductType } from '@models/product';
import { ItemUnit, Item } from '@models/fields/item';

export class ItemDTO {
    _id?: Types.ObjectId;
    product: Types.ObjectId;
    name: string;
    type: ProductType;
    quantity: number;
    unit: ItemUnit;

    constructor(){}

    toModel(): Item {
        return {
            product: this.product,
            quantity: this.quantity,
            unit: this.unit
        };
    }
}