import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLazyTranslateServiceWrapper } from "../../../../ngx-lazy-translate-loader/src/lib/ngx-lazy-translate-service-wrapper";
import { PanelComponent } from './panel/panel.component';
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";



@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        component: PanelComponent
      }
    ])
  ]
})
export class LazyModule2Module {

  constructor(i18n: NgxLazyTranslateServiceWrapper) {
    i18n.registerModuleTranslation('./assets/i18n/lazy/module-2', true);
  }

}
