import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './containers/settings/settings.component';
import {RouterModule} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '**',
        component: SettingsComponent
      }
    ]),
    NgxDatatableModule
  ],
})
export class SettingsModule {}
