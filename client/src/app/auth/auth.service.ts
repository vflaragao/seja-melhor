import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { AccessToken } from './auth.dto';
import { Credentials } from '@models/fields/credentials';

import { environment } from '@env/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) { }

  login(credentials: Credentials) {
    return this.http.post<AccessToken>(`${environment.API_BASE}/auth/login`, credentials)
      .pipe(
        tap(token => this.accountService.setToken(token.accessToken))
      ).toPromise();
  }

  logout() {
    this.accountService.setToken(null);
  }
}
