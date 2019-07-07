import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

import { User } from '@models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  private passVisibility: boolean;
  private user: User;

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.user = new User();
  }

  get passType() {
    return this.passVisibility ? 'text' : 'password';
  }

  get passIcon() {
    return this.passVisibility ? 'visibility_off' : 'visibility';
  }

  ngOnInit() {
  }

  toggleVisibility() {
    this.passVisibility = !this.passVisibility;
  }

  async onSave() {
    try {
      await this.userService.save(this.user);
      await this.authService.login(this.user.toCredentials());
    } catch (e) {
      console.error(e);
    }
  }
}
