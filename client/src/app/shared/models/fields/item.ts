import { ProductType } from '@models/product';

export enum ItemUnit {
    UNIT = 'UNIT',
    WEIGHT = 'WEIGHT',
}

export const ItemUnitValues = [
    ItemUnit.UNIT,
    ItemUnit.WEIGHT
];

export class Item {
    product: string;
    name: string;
    type: ProductType;
    quantity: number;
    unit: ItemUnit;

    constructor(){}
}