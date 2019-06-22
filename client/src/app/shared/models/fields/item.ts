export enum ItemUnit {
    UNIT = 'UNIT',
    WEIGHT = 'WEIGHT',
}

export const ItemUnitValues = [
    ItemUnit.UNIT,
    ItemUnit.WEIGHT
];

export interface Item {
    product: string;
    quantity: number;
    unit: ItemUnit;
}