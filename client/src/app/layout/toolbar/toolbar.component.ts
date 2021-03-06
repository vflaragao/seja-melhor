import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Account } from 'src/app/auth/auth.dto';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountService } from 'src/app/auth/account.service';

import { ChangePasswordComponent } from '@dialogs/index';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void>;

  private logged: Account;
  private accounts: Account[];

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private authService: AuthService,
    private accountService: AccountService,
  ) {
    this._destroy$ = new Subject();
  }

  get defaultManageRoute() {
    return this.accountService.defaultManageRoute;
  }

  get defaultRoute() {
    return this.accountService.defaultRoute;
  }

  get hasMultiAccounts() {
    return this.accounts && this.accounts.length > 1;
  }

  get containsFoundation() {
    return this.accounts && !!this.accounts.find(acc => acc.institutional);
  }

  get containsUser() {
    return this.accounts && !!this.accounts.find(acc => !acc.institutional);
  }

  ngOnInit() {
    this.accountService.account
      .pipe(takeUntil(this._destroy$))
      .subscribe(account => this.logged = account);
    this.accountService.accounts
      .pipe(takeUntil(this._destroy$))
      .subscribe(accounts => this.accounts = accounts);
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  async onChangePassword() {
    const _ = this._dialog.open(ChangePasswordComponent);
  }

  async onChangeProfile(accountID: string) {
    try {
      if (accountID !== this.logged._id) {
        await this.accountService.changeAccount(accountID);
      }
    } catch (e) {
      console.error(e);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
