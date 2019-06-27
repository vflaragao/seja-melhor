import { Component, OnInit } from '@angular/core';

import { UserService } from '@core/services';

import { User } from '@models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  private confirmPass: string;
  private user: User;

  constructor(
    private userService: UserService
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  async onSave() {
    try {
      await this.userService.save(this.user);
      this.user = new User();
    } catch (e) {
      console.error(e);
    }
  }
}
