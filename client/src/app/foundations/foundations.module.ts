import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { FoundationsComponent } from './foundations.component';
import { PersonalGuard } from '@core/personal.guard';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: FoundationsComponent
      },
      {
        path: '',
        component: FoundationsComponent,
        canActivate: [PersonalGuard],
        data: {
          institutional: true
        }
      },
    ]
  }  
]

@NgModule({
  declarations: [FoundationsComponent],
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
