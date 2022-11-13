import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CampaignsComponent} from './containers/campaigns/campaigns.component';
import {SharedModule} from "../shared/shared.module";
import {CampaignsRoutingModule} from "./campaigns-routing.module";
import {EffectsModule} from "@ngrx/effects";
import {CampaignsEffects} from "./state/campaigns.effects";

@NgModule({
  declarations: [CampaignsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CampaignsRoutingModule,
    EffectsModule.forFeature([CampaignsEffects])
  ],
})
export class CampaignsModule {
}
