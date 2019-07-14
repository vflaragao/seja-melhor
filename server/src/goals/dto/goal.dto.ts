import { Types } from "mongoose";

import { Objects } from "@helpers/object";

import { ProductType } from "@models/product";
import { Account } from "auth/jwt.interface";
import { ItemDTO } from "products/dto/item.dto";

export interface GoalDTO {
    disabled?: boolean;
    creator: Types.ObjectId;
    items: ItemDTO[];
    types: ProductType[];
}

export class GoalCreateDTO {
    
    constructor(
        public _id?: Types.ObjectId,
        public disabled?: boolean,
        public items?: ItemDTO[],
    ){}

    toModel(account: Account): GoalDTO {
        return {
            items: this.items,
            creator: account._id,
            types: this.getTypes(),
        } as GoalDTO;
    }

    getTypes() {
        let distinctItemTypes = this.items.map(item => item.type);
        return Objects.distinct(distinctItemTypes);
    }
}