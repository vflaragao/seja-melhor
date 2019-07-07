import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: UsersComponent
      },
      {
        path: '',
        component: UsersComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainModule { }
