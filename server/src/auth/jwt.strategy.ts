import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException, Injectable } from '@nestjs/common';

import { Account } from './jwt.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'xpto',
        });
    }

    validate(payload: Account) {
        const user = this.authService.validateToken(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
