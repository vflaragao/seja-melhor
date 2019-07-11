import { NgModule, LOCALE_ID } from '@angular/core';
import { MatIconRegistry, MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';

import { TokenInterceptor } from '@core/token-interceptor';

registerLocaleData(localePT, 'pt');

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
  providers: [
    { provide: DateAdapter, useClass: MatNativeDateModule },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
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
