import { Credentials } from './fields/credentials';
import { SocialMedia } from './fields/social-media';

export class User {
    name: string;
    phone: string;
    email: string;
    password?: string;
    disabled: boolean;
    social?: SocialMedia;

    constructor () {
        this.social = new SocialMedia();
    }

    toCredentials(): Credentials {
        return {
            email: this.email,
            password: this.password
        };
    }
}

export interface UserDTO {
    _id: string;
    name: string;
    phone: string;
    email: string;
    disabled: boolean;
}