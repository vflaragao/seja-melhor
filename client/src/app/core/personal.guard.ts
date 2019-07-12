import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AccountService } from '../auth/account.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _accountService: AccountService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot) {
    return this._accountService.account
      .pipe(
        map(account => {
          const isInstitutional = next.data.institutional;
          if (!account || (isInstitutional !== account.institutional)) {
            this._router.navigateByUrl(this._accountService.defaultRoute);
            return false;
          }
          return true;
        })
      )
  }
}
