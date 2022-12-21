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

@NgModule({
  declarations: [
    CampaignsComponent,
    CampaignFormComponent,
    SendCampaignFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CampaignsRoutingModule,
    EffectsModule.forFeature([CampaignsEffects]),
    ReactiveFormsModule,
  ],
})
export class CampaignsModule {}
