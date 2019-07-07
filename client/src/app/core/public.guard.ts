import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate } from '@angular/router';

import { map } from 'rxjs/operators';

import { AccountService } from '../auth/account.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  canActivate() {
    return this.accountService.account
      .pipe(
        map(account => {
          if (account) {
            this.router.navigateByUrl(this.accountService.defaultRoute);
            return false;
          }
          return true;
        })
      );
  }
}
