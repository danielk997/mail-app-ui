import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesComponent} from './containers/templates/templates.component';
import {SharedModule} from '../shared/shared.module';
import {TemplatesRoutingModule} from './templates-routing.module';
import {TemplateFormComponent} from './containers/template-form/template-form.component';
import {StoreModule} from "@ngrx/store";
import * as fromTemplates from "./state/templates.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TemplatesEffects} from "./state/templates.effects";

@NgModule({
  declarations: [TemplatesComponent, TemplateFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule,
    StoreModule.forFeature(fromTemplates.templatesConfigFeatureKey, fromTemplates.templatesReducer),
    EffectsModule.forFeature([TemplatesEffects]),
  ],
})
export class TemplatesModule {
}
