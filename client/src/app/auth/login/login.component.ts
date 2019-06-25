import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';

import { AuthCreationOptionsComponent, AuthCreationOption } from '@shared/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
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
