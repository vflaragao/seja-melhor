import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { first, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AccountService } from '../auth/account.service';
import { throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private accountService: AccountService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.accountService.token
            .pipe(
                first(),
                switchMap(token => {
                    if (!token) {
                        return next.handle(req);
                    }
                    const newRequest = req.clone({
                        headers: req.headers.set(
                            'Authorization',
                            `Bearer ${token}`,
                        )
                    });
                    return next.handle(newRequest);
                }),
                catchError(err => {
                    if (err.status === 401) {
                        this.authService.logout();
                    }
                    return throwError(err);
                })
            )
    }
}
