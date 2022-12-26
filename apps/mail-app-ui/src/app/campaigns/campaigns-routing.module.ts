import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CampaignsComponent} from "./containers/campaigns/campaigns.component";
import {CampaignFormComponent} from "./containers/campaign-form/campaign-form.component";
import {SendCampaignFormComponent} from "./containers/send-campaign-form/send-campaign-form.component";
import {CampaignsSentComponent} from "./containers/campaigns-sent/campaigns-sent.component";
import {CampaignStatsComponent} from "./containers/campaign-stats/campaign-stats.component";

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
  {
    path: ':id/sent',
    component: CampaignsSentComponent,
    pathMatch: 'full'
  },
  {
    path: ':id/stats',
    component: CampaignStatsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule {
}
