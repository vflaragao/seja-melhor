import { Types } from 'mongoose';

export class UserDTO {
    // tslint:disable-next-line:variable-name
    public _id: Types.ObjectId;

    // tslint:disable-next-line:no-empty
    constructor(
        public name?: string,
        public phone?: string,
        public email?: string,
        public password?: string,
        public institutional?: boolean,
        public disabled?: boolean,
    ) {}
}
