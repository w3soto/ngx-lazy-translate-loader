import { Injectable, isDevMode } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from "rxjs";

import { NgxLazyTranslateServiceWrapper } from "./ngx-lazy-translate-service-wrapper";


@Injectable({
  providedIn: 'root'
})
export class NgxLazyTranslateResolver implements Resolve<boolean> {

  constructor(
    private _lazyTranslateService: NgxLazyTranslateServiceWrapper
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const loader = this._lazyTranslateService.loader;
    const path = route.data[loader.modulePathKey];

    if (path) {
      this._lazyTranslateService.registerModuleTranslation(path);
      return this._lazyTranslateService.reload().pipe(map(() => true));
    } else {
      if (isDevMode()) {
        console.error("Missing [" + loader.modulePathKey + "] config in route's data field!", route)
      }
      return false;
    }
  }

}
