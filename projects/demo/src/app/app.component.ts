import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { NgxLazyTranslateServiceWrapper } from "../../../ngx-lazy-translate-loader/src/lib/ngx-lazy-translate-service-wrapper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  language: string = 'en';

  constructor(
    private i18n: NgxLazyTranslateServiceWrapper
  ) {
    this.i18n.translateService.addLangs(['en', 'sk']);
    this.i18n.translateService.use('en');
  }

  useLang(lang: string) {
    this.i18n.use(lang);
  }

}
