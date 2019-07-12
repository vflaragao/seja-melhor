import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';

import { Account, AccessToken } from './auth.dto';
import { extractAccountFromToken } from './auth.helper';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _account: Account;
  private _accounts: Account[];
  private _token = new BehaviorSubject<string>(localStorage.getItem('token'));

  constructor(
    private _router: Router,
    private _http: HttpClient,
  ) {
    this._account = null;
    this._accounts = null;
  }

  get defaultRoute() {
    const account = extractAccountFromToken(this._token.value);
    if (!account) {
      return '/';
    }
    else if (account.institutional) {
      return '/foundations';
    }
    return '/users';
  }

  get defaultManageRoute() {
    const account = extractAccountFromToken(this._token.value);
    if (!account) {
      return '/';
    }
    else if (account.institutional) {
      return '/foundations/manage';
    }
    return '/users/manage';
  }

  get token() {
    return this._token.asObservable();
  }

  get account(): Observable<Account> {
    return this._token.asObservable()
      .pipe(
        switchMap(token => {
          if (!token) { return of(null); }
          if (!this._account) { return this.setupAccount(); }
          return of(this._account);
        }),
        tap(account => {
          if (account !== this._account) {
            this._account = account;
          }
        })
      );
  }
  
  get accounts(): Observable<Account[]> {
    return this._token.asObservable()
    .pipe(
      switchMap(token => {
        if (!token) { return of(null); }
        if (!this._accounts) { return this.setupAccounts(); }
        return of(this._accounts);
      }),
      tap(accounts => {
        if (accounts !== this._accounts) {
          this._accounts = accounts;
        }
      })
    );
  }

  async setToken(token: string) {
    this._token.next(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this._router.navigateByUrl(this.defaultRoute);
  }

  changeAccount(accountID: string) {
    return this._http.post<AccessToken>(`${environment.API_BASE}/auth/change`, { account: accountID })
      .pipe(
        tap(token => this.setToken(token.accessToken))
      )
      .toPromise();
  }

  private setupAccount() {
    return this._http.get<Account>(`${environment.API_BASE}/auth/profile`);
  }
  private setupAccounts() {
    return this._http.get<Account[]>(`${environment.API_BASE}/auth/profiles`);
  }
}
