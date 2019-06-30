import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchModule { }
