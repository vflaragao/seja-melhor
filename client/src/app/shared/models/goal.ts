import { Item } from './fields/item';
import { ProductType } from './product';

export class GoalDTO {
    renewalDay: number;
    disabled: boolean;
    creator: string;
    items: Item[];
    types: ProductType[];
}