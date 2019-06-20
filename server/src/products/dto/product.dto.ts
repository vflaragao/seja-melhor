import { Types } from "mongoose";

import { ProductType } from "@models/product";

export interface ProductDTO {
    name: string;
    type: ProductType;
    creator: Types.ObjectId;
    creatorSource: string;
    disabled: boolean;
}