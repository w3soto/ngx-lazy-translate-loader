import { isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";

import { forkJoin, Observable, of } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";

import * as deepMerge from "deepmerge";


export interface NgxLazyTranslateHttpLoaderConfig {
  /**
   * Base path prefix (default ./assets/i18n/)
   */
  basePath?: string,
  /**
   * Suffix (default .json)
   */
  suffix?: string,
  /**
   * Static paths
   */
  paths?: string[],
  /**
   * Dynamic module "path" key (used in route's data field configuration)
   */
  modulePathKey?: string,
  /**
   * Version to avoid HTTP caching
   */
  version?: string,
}


const cleanPathRe = /\/{2,}/;

function cleanPath(path: string) {
  return path.replace(cleanPathRe, "/");
}


export class NgxLazyTranslateHttpLoader implements TranslateLoader {

  readonly basePath: string = "./assets/i18n/";
  readonly suffix: string = ".json";
  readonly modulePathKey: string = "i18nPath";
  readonly version: string = "" + new Date().getTime();

  private _currentLang?: string;

  /**
   * Registered resources
   */
  private _resources: string[] = [];

  /**
   * Loaded resources cache
   */
  private _loadedResources: Map<string, any> = new Map<string, any>();

  constructor(
    private _http: HttpClient,
    config?: NgxLazyTranslateHttpLoaderConfig
  ) {

    this.basePath = config?.basePath || this.basePath;
    this.suffix = config?.suffix || this.suffix;
    this.modulePathKey = config?.modulePathKey || this.modulePathKey;
    this.version = config?.version || this.version;

    this._resources.push(cleanPath(this.basePath + "/{{lang}}" + this.suffix));

    config?.paths?.forEach(p => {
      this._resources.push(this._buildPath(p));
    });
  }

  /**
   * @override
   * @param lang
   */
  getTranslation(lang: string): Observable<any> {
    this._currentLang = lang;

    const requests = this._resources.map(resource => {

      const path = resource.replace("{{lang}}", lang);

      if (this._loadedResources.has(path)) {
        return of(this._loadedResources.get(path));
      } else {
        return this._http.get(path + "?ver=" + this.version).pipe(
          shareReplay(),
          tap(resp => {
            this._loadedResources.set(path, resp);
          }),
          catchError(res => {
            if (isDevMode()) {
              console.error("Can not load translation file [" + path + "]!", res.message);
            }
            this._loadedResources.set(path, {});
            return of({});
          }));
      }
    });

    return forkJoin(requests).pipe(map(response => deepMerge.all(response)));
  }

  /**
   * Register module translation
   */
  registerModuleTranslation(path: string) {
    const fullPath = this._buildPath(path);
    if (!this._resources.find(r => r == fullPath)) {
      this._resources.push(fullPath);
    }
  }

  /**
   * Build full path
   */
  private _buildPath(path: string) {
    let fullPath: string;
    if (path.startsWith("/") || path.startsWith("./")) {
      fullPath = path + "/{{lang}}" + this.suffix;
    }
    else {
      fullPath = this.basePath + "/" + path + "/{{lang}}" + this.suffix;
    }
    return cleanPath(fullPath);
  }

}
