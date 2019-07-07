export class Credentials {
    email?: string;
    password?: string;
    
    constructor () {}
}

export class UpdatePassword {
    newPassword: string;
    currentPassword: string;

    constructor() {}
}