import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { UsersComponent } from './users.component';
import { PersonalGuard } from '@core/personal.guard';

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
        component: UsersComponent,
        canActivate: [PersonalGuard],
        data: {
          institutional: false
        },
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
