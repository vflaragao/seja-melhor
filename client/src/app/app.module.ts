import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),

    AppRoutingModule,
    SharedModule,
    LayoutModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
  }
}
