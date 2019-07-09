export enum ProductType {
    TOY = 'TOY', //videogame_asset  #66bb6a
    FOOD = 'FOOD', //restaurant  #8d6e63
    REMEDY = 'REMEDY', //local_pharmacy  #f44336
    CLOTHE = 'CLOTHE', //accessibility  #7e57c2
    CLEANING_MATERIAL = 'CLEANING_MATERIAL'
}

export const ProductTypeValues = [
    ProductType.TOY,
    ProductType.FOOD,
    ProductType.REMEDY,
    ProductType.CLOTHE,
    ProductType.CLEANING_MATERIAL,
];

export interface ProductTypeStatistics {
    type: ProductType;
    progress: number;
}

export class Product {
    _id: string;
    name: string;
    type: ProductType;
    disabled: boolean;

    constructor(){}
}