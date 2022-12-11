import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './containers/campaigns/campaigns.component';
import { SharedModule } from '../shared/shared.module';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CampaignsEffects } from './state/campaigns.effects';
import { CampaignFormComponent } from './containers/campaign-form/campaign-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';

@NgModule({
  declarations: [
    CampaignsComponent,
    CampaignFormComponent,
    TemplatePreviewComponent,
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
