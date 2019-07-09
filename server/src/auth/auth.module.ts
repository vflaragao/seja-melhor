import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

import { CoreModule } from 'core/core.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'account'
    }),
    JwtModule.register({
      secret: 'xpto',
      signOptions: {
        expiresIn: '2 days'
      }
    }),
    CoreModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, CoreModule, AuthService]
})
export class AuthModule {}
