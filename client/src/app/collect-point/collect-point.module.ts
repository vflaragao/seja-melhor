import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CollectPointComponent } from './collect-point.component';

const routes: Routes = [
  {
    path: '',
    component: CollectPointComponent
  },
];

@NgModule({
  declarations: [CollectPointComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CollectPointModule { }
