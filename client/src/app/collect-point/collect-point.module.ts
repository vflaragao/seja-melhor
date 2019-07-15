import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { ManageComponent } from './manage/manage.component';
import { CollectPointComponent } from './main/collect-point.component';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage/:id',
        component: ManageComponent
      },
      {
        path: 'manage',
        component: ManageComponent
      },
      {
        path: ':id',
        component: CollectPointComponent
      },
      {
        path: '',
        component: CollectPointComponent
      },
    ]
  }
];

@NgModule({
  declarations: [CollectPointComponent, ManageComponent],
  imports: [
    SharedModule,
    NgxMaskModule.forChild(),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, NgxMaskModule]
})
export class CollectPointModule { }
