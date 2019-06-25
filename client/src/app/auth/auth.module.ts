import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateFoundationComponent } from './create-foundation/create-foundation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'createUser', component: CreateUserComponent },
      { path: 'createFoundation', component: CreateFoundationComponent },
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    CreateFoundationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }
