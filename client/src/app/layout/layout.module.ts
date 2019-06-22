import { NgModule } from '@angular/core';

import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    FooterComponent,
    ToolbarComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FooterComponent,
    ToolbarComponent,
  ]
})
export class LayoutModule { }
