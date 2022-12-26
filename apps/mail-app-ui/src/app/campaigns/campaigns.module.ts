import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './containers/campaigns/campaigns.component';
import { SharedModule } from '../shared/shared.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CampaignsEffects } from './state/campaigns.effects';
import { CampaignFormComponent } from './containers/campaign-form/campaign-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SendCampaignFormComponent } from './containers/send-campaign-form/send-campaign-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromCampaigns from './state/campaigns.reducer';
import { CampaignStatsComponent } from './containers/campaign-stats/campaign-stats.component';
import { CampaignsSentComponent } from './containers/campaigns-sent/campaigns-sent.component';

@NgModule({
  declarations: [
    CampaignsComponent,
    CampaignFormComponent,
    SendCampaignFormComponent,
    CampaignStatsComponent,
    CampaignsSentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CampaignsRoutingModule,
    StoreModule.forFeature(
      fromCampaigns.campaignsConfigFeatureKey,
      fromCampaigns.campaignsReducer
    ),
    EffectsModule.forFeature([CampaignsEffects]),
    ReactiveFormsModule,
  ],
})
export class CampaignsModule {}
