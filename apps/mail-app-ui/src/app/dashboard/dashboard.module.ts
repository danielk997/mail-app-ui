import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ReceiversFormComponent} from './containers/receivers-form/receivers-form.component';
import {GroupsFormComponent} from './containers/groups-form/groups-form.component';
import {StoreModule} from "@ngrx/store";
import * as fromReceivers from "./state/receivers/receivers.reducer";
import * as fromGroups from "./state/groups/groups.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ReceiversEffects} from "./state/receivers/receivers.effects";
import {GroupsEffects} from "./state/groups/groups.effects";

@NgModule({
  declarations: [
    DashboardComponent,
    ReceiversFormComponent,
    GroupsFormComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromReceivers.receiversFeatureKey, fromReceivers.receiversReducer),
    StoreModule.forFeature(fromGroups.groupsFeatureKey, fromGroups.groupsReducer),
    EffectsModule.forFeature([ReceiversEffects, GroupsEffects]),
  ],
})
export class DashboardModule {
}
