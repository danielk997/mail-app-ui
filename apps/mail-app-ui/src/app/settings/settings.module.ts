import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './containers/settings/settings.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../shared/shared.module';
import {SettingsRoutingModule} from './settings-routing.module';
import {SmtpFormComponent} from './containers/smtp-form/smtp-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import *  as fromSmtpConfig from './state/smtp-config.reducer';
import {EffectsModule} from "@ngrx/effects";
import {SmtpConfigEffects} from "./state/smtp-config.effects";

@NgModule({
  declarations: [SettingsComponent, SmtpFormComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgxDatatableModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromSmtpConfig.smtpConfigFeatureKey, fromSmtpConfig.smtpConfigReducer),
  ],
})
export class SettingsModule {
}
