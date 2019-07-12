import { Types } from 'mongoose';
import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserStatistics {
    constructor(
        public goalDonations?: number,
        public campaignDonations?: number,
        public ownCampaigns?: number,
        public ownCollectPoints?: number,
    ) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UserCollaborator {
    constructor(
        // tslint:disable-next-line:variable-name
        public _id: Types.ObjectId,
        public email: string,
        public name: string,
    ) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UserCreateDTO {
    @IsOptional()
    public _id: Types.ObjectId;

    @IsString()
    public name?: string;
    @IsPhoneNumber('BR')
    public phone?: string;
    @IsEmail()
    public email?: string;
    @IsString()
    public password?: string;

    @IsOptional()
    public institutional: boolean;

    constructor(
        name?: string,
        phone?: string,
        email?: string,
        password?: string,
        institutional?: boolean,
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.institutional = institutional;
    }
}

export interface UserUpdateDTO {
    _id: Types.ObjectId;
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    institutional?: boolean;
    disabled?: boolean;
}
