import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Account } from 'auth/jwt.interface';

@Injectable()
export class FoundationRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const account = request.account as Account;
    if (!account.institutional) {
      return false;
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const hasPermission = roles.includes(account.role);
    return account && hasPermission;
  }
}
