import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'users/users.module';
import { FoundationsModule } from 'foundations/foundations.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

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
    UsersModule,
    FoundationsModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, AuthService]
})
export class AuthModule {}
