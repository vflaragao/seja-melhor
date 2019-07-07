import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

import { AuthService } from '../auth.service';
import { AuthCreationOptionsComponent, AuthCreationOption } from '@shared/components';

import { Credentials } from '@models/fields/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private credentials: Credentials;

  constructor(
    private router: Router,
    private authService: AuthService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.credentials = new Credentials();
  }

  ngOnInit() {
  }

  async onAuth() {
    try {
      await this.authService.login(this.credentials);
    } catch (e) {
      console.error(e);
    }
  }

  onCreate() {
    this._bottomSheet.open(AuthCreationOptionsComponent)
      .afterDismissed()
      .subscribe((option: AuthCreationOption) => {
        if (option) {
          switch (option) {
            case AuthCreationOption.USER:
              this.router.navigate(['/auth/createUser']);
              break;
            case AuthCreationOption.FOUNDATION:
              this.router.navigate(['/auth/createFoundation']);
              break;
          }
        }
      });
  }
}
