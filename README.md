# NgxLazyTranslateLoader

Lazy module translation loader 

## Installation
```shell
npm -i @w3soto/ngx-lazy-translate-loader
```

## Initialization

```typescript

function TranslateLoaderFactory(http: HttpClient): TranslateLoader {
  return new NgxLazyTranslateHttpLoader(http, {
    basePath: './assets/i18n',  // default
    suffix: '.json', // default,
    modulePathKey: 'i18nPath', // default
    // eager translation paths
    paths: [
      'static/module-1', // relative to "basePath"
      './assets/i18n/static/module-2' // absolute (starts with / or ./)
    ]
  });
}

@NgModule({
  ...
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  ...
})
export class AppModule { }

```

### Load translation files with resolver 

Note: This solution guarantees that translation file will be loaded before module is loaded 
```typescript
const routes: Routes = [
  {
    path: 'lazy-module',
    resolve: {
      i18n: NgxLazyTranslateResolver
    },
    data: {
      i18nPath: 'lazy/module' // relative path
    },
    loadChildren: () => import('./lazy-module/lazy-module.module').then(m => m.LazyModuleModule)
  },
];
```

### Load translation files in module's constructor

```typescript
@NgModule({
  imports: [
    TranslateModule,
  ]
})
export class LazyModule {

  constructor(i18n: NgxLazyTranslateServiceWrapper) {
    i18n.registerModuleTranslation('./assets/i18n/lazy/module', true);
  }

}

```
