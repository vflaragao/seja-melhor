import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

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
    NgxMaskModule.forChild(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, NgxMaskModule]
})
export class AuthModule { }
