import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsComponent } from './main/campaigns.component';
import { ManageComponent } from './manage/manage.component';

import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage',
        component: ManageComponent,
      },
      {
        path: ':id',
        component: CampaignsComponent
      },
      {
        path: '',
        component: CampaignsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [CampaignsComponent, ManageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CampaignsModule { }
