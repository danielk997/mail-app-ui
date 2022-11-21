import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './containers/settings/settings.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {SharedModule} from "../shared/shared.module";
import {SettingsRoutingModule} from "./settings-routing.module";

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgxDatatableModule,
    SharedModule
  ],
})
export class SettingsModule {
}
