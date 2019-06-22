export enum ProductType {
    TOY = 'TOY', //videogame_asset  #66bb6a
    FOOD = 'FOOD', //restaurant  #8d6e63
    REMEDY = 'REMEDY', //local_pharmacy  #f44336
    CLOTHE = 'CLOTHE', //accessibility  #7e57c2
}

export const ProductTypeValues = [
    ProductType.TOY,
    ProductType.FOOD,
    ProductType.REMEDY,
    ProductType.CLOTHE
];

export interface Product {
    name: string;
    type: ProductType;
    creator: string;
    creatorSource: string;
    disabled: boolean;
}