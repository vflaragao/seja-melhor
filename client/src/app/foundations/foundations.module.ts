import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxMaskModule } from 'ngx-mask';

import { PersonalGuard } from '@core/personal.guard';

import { SharedModule } from '@shared/shared.module'

import { ManageComponent } from './manage/manage.component';
import { FoundationsComponent } from './main/foundations.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage',
        component: ManageComponent,
        canActivate: [PersonalGuard],
        data: { institutional: true }
      },
      {
        path: ':id',
        component: FoundationsComponent
      },
      {
        path: '',
        component: FoundationsComponent,
        canActivate: [PersonalGuard],
        data: { institutional: true }
      },
    ]
  }  
]

@NgModule({
  declarations: [FoundationsComponent, ManageComponent],
  imports: [
    SharedModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    NgxMaskModule,
  ]
})
export class FoundationsModule { }
