import { Item } from './fields/item';
import { ActionCategory } from './campaign';

export class GoalCreateDTO {
    _id: string;
    disabled: boolean;
    items: Item[];

    constructor() {
        this.items = [];
    }
}

export interface GoalGetDTO {
    _id?: string;
    items?: Item[];
    creator?: {
        name: string;
        category: ActionCategory;
    }
}