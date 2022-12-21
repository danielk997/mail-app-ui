import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CampaignsComponent} from "./containers/campaigns/campaigns.component";
import {CampaignFormComponent} from "./containers/campaign-form/campaign-form.component";
import {SendCampaignFormComponent} from "./containers/send-campaign-form/send-campaign-form.component";

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: CampaignFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'send',
    component: SendCampaignFormComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule {
}
