import { Injectable } from "@angular/core";
import { mergeMap, Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { NgxLazyTranslateHttpLoader } from "./ngx-lazy-translate-http-loader";



@Injectable({
  providedIn: 'root'
})
export class NgxLazyTranslateServiceWrapper {

  get loader(): NgxLazyTranslateHttpLoader {
    if (this.translateService.currentLoader instanceof NgxLazyTranslateHttpLoader) {
      return this.translateService.currentLoader as NgxLazyTranslateHttpLoader;
    }
    throw new Error("Use NgxLazyTranslateHttpLoader implementation of TranslateLoader");
  }

  constructor(
    public readonly translateService: TranslateService,
  ) {
  }

  registerModuleTranslation(path: string, autoLoad?: boolean) {
    this.loader.registerModuleTranslation(path);
    if (autoLoad) {
      this.reload();
    }
  }

  reload(): Observable<any> {
    return this.translateService.reloadLang(this.translateService.currentLang).pipe(
      mergeMap(() => this.translateService.use(this.translateService.currentLang))
    )
  }

  use(lang: string): Observable<any>   {
    this.translateService.resetLang(lang);
    return this.translateService.use(lang);
  }

}
