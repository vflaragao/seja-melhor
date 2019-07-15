import { Types } from 'mongoose';
import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';
import { SocialMedia } from '@models/fields/social-media';

export class UserStatistics {
    constructor(
        public goalDonations?: number,
        public campaignDonations?: number,
        public ownCampaigns?: number,
        public ownCollectPoints?: number,
    ) { }
}

// tslint:disable-next-line:max-classes-per-file
export class UserCollaborator {
    constructor(
        public _id?: Types.ObjectId,
        public email?: string,
        public name?: string,
    ) { }
}

// tslint:disable-next-line:max-classes-per-file
export class UserCreateDTO {
    public _id: Types.ObjectId;
    public name?: string;
    public phone?: string;
    public email?: string;
    public password?: string;
    public institutional: boolean;
    public social: SocialMedia;

    constructor(
        name?: string,
        phone?: string,
        email?: string,
        password?: string,
        institutional?: boolean,
        social?: SocialMedia,
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.institutional = institutional;
        this.social = social;
    }
}

export class UserGetDTO {
    constructor(
        public _id?: Types.ObjectId,
        public name?: string,
        public phone?: string,
        public email?: string,
    ) {}
}
