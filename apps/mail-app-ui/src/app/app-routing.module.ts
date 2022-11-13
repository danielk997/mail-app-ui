import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OktaAuthGuard, OktaCallbackComponent} from "@okta/okta-angular";
import {LoginComponent} from "./core/components/login/login.component";
import {RouteSegment} from "./shared/routes/routeSegment";

const routes: Routes = [
  {
    path: '',
    redirectTo: RouteSegment.dashboard,
    pathMatch: 'full'
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: RouteSegment.dashboard,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [OktaAuthGuard]
  },
  {
    path: RouteSegment.campaigns,
    loadChildren: () => import('./campaigns/campaigns.module').then(m => m.CampaignsModule),
    canLoad: [OktaAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
