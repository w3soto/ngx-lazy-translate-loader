import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";



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
export class Module2Module { }
