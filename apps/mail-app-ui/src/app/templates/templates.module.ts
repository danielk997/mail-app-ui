import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './containers/templates/templates.component';
import { SharedModule } from '../shared/shared.module';
import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplateFormComponent } from './containers/template-form/template-form.component';

@NgModule({
  declarations: [TemplatesComponent, TemplateFormComponent],
  imports: [CommonModule, SharedModule, TemplatesRoutingModule],
})
export class TemplatesModule {}
