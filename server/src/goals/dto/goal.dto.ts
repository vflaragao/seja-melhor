import { Item } from "@models/fields/item";
import { ProductType } from "@models/product";

export interface GoalDTO {
    renewalDay: number;
    disabled: boolean;
    creator: string;
    items: Item[];
    types: ProductType[];
}