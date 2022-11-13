import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CampaignsComponent} from './containers/campaigns/campaigns.component';
import {SharedModule} from "../shared/shared.module";
import {CampaignsRoutingModule} from "./campaigns-routing.module";

@NgModule({
  declarations: [CampaignsComponent],
  imports: [CommonModule, SharedModule, CampaignsRoutingModule],
})
export class CampaignsModule {
}
