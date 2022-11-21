import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./containers/settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
