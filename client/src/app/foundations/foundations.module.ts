import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { FoundationsComponent } from './foundations.component';

const routes: Routes = [
  {
    path: '',
    component: FoundationsComponent
  }  
]

@NgModule({
  declarations: [FoundationsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FoundationsModule { }
