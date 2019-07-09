import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';

import { UsersService } from 'core/users.service';
import { FoundationsService } from 'core/foundations.service';

import { Account } from './jwt.interface';
import { Credentials } from '@models/fields/credentials';

@Injectable()
export class AuthService {

    constructor (
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly foundationService: FoundationsService,
    ) {}

    async authenticate(credentials: Credentials): Promise<string> {
        let selectedAccount = null;
        const user = await this.userService.getByEmail(credentials.email);
        if (!user || !user.comparePassword(credentials.password)) {
            throw new UnauthorizedException('Credenciais inválidas');
        } else if (
            user.institutional ||
            (!!user.defaultAccount && (user.defaultAccount !== user._id))
        ) {
            const foundation = await this.foundationService.getByUser(user._id);
            selectedAccount = foundation.asAccount(user);
        } else {
            selectedAccount = user.asAccount();
        }
        return this.jwtService.sign(selectedAccount);
    }

    async getAccount(id: Types.ObjectId) {
        const user = await this.userService.get(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        let selectedAccount = user.asAccount();
        if (!selectedAccount) {
            const foundation = await this.foundationService.getByUser(id);
            selectedAccount = foundation.asAccount(user);
        }
        return selectedAccount;
    }

    async listAccounts(id: Types.ObjectId) {
        let userAccount = null;
        const user = await this.userService.get(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        userAccount = user.asAccount();
        let foundationAccounts = [];

        const foundations = await this.foundationService.listByUser(user._id);
        if (foundations && foundations.length) {
            foundationAccounts = foundations.map(
                foundation => foundation.asAccount(user)
            );
        }
        const accounts: Account[] = [userAccount, ...foundationAccounts].filter(_ => !!_);
        return accounts;
    }

    async changeSelectedAccount(account: Account, accountID: Types.ObjectId) {
        const profiles = await this.listAccounts(account.user);
        const selectedAccount = profiles.find(({ _id }) => new Types.ObjectId(accountID).equals(_id));
        if (!selectedAccount) {
            throw new BadRequestException('Operação não permitida');
        }
        return this.jwtService.sign(selectedAccount);
    }

    /** TODO: token validation */
    validateToken(payload: Account) {
        return payload;
    }
}
