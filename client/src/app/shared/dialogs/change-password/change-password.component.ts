import { Component, OnInit } from '@angular/core';

import { UpdatePassword } from '@models/fields/credentials';

interface FieldVisibility {
  type: string;
  icon: string;
}

const visibility = {
  password: { type: 'password', icon: 'visibility' },
  text: { type: 'text', icon: 'visibility_off' },
};

const visibilityChange = {
  password: visibility.text,
  text: visibility.password,
};

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private visibility: FieldVisibility[];

  private credentials: UpdatePassword;
  private confirmPassword: string;

  constructor() {
    this.credentials = new UpdatePassword();
    this.visibility = [
      visibility.password,
      visibility.password,
      visibility.password,
    ]
  }

  get valid() {
    return this.credentials.currentPassword
      && this.credentials.newPassword
      && (this.credentials.newPassword === this.confirmPassword);
  }

  ngOnInit() {
  }

  toggleVisibility(index: number) {
    this.visibility[index] = visibilityChange[this.visibility[index].type];
  }

  onConfirm() {

  }
}
