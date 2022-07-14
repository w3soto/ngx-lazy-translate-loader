import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { NgxLazyTranslateHttpLoader } from "../../../ngx-lazy-translate-loader/src/lib/ngx-lazy-translate-http-loader";
import { RouterModule } from "@angular/router";


function TranslateLoaderFactory(http: HttpClient): TranslateLoader {
  return new NgxLazyTranslateHttpLoader(http, {
    basePath: './assets/i18n',  // default
    suffix: '.json', // default,
    modulePathKey: 'i18nPath', // default
    paths: [
      'static/module-1', // relative
      './assets/i18n/static/module-2' // absolute
    ]
  });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
