import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxLazyTranslateResolver } from "../../../ngx-lazy-translate-loader/src/lib/ngx-lazy-translate-resolver";
import { Module1Module } from "./module-1/module-1.module";
import { Module2Module } from "./module-2/module-2.module";

const routes: Routes = [
  {
    path: 'module-1',
    loadChildren: () => Module1Module
  },
  {
    path: 'module-2',
    loadChildren: () => Module2Module
  },
  {
    path: 'lazy-module-1',
    resolve: {
      i18n: NgxLazyTranslateResolver
    },
    data: {
      i18nPath: 'lazy/module-1' // relative
    },
    loadChildren: () => import('./lazy-module-1/lazy-module-1.module').then(m => m.LazyModule1Module)
  },
  {
    path: 'lazy-module-2',
    loadChildren: () => import('./lazy-module-2/lazy-module-2.module').then(m => m.LazyModule2Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
