import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class Module1Module { }
