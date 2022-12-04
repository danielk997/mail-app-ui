import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIALS } from './components/materials';
import { HttpClientModule } from '@angular/common/http';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from './components/form-base/form-base.component';
import { FormFieldDirective } from './components/form-base/form-field.directive';
import { FormSubmitButtonDirective } from './components/form-base/form-submit-button.directive';
import { TemplateContextTypeDirective } from './directives/template-context-type.directive';
import { StartCasePipe } from './pipes/start-case.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ActionBarComponent,
    FormBaseComponent,
    FormFieldDirective,
    FormSubmitButtonDirective,
    TemplateContextTypeDirective,
    StartCasePipe,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, ...MATERIALS],
  exports: [
    ...MATERIALS,
    ActionBarComponent,
    FormFieldDirective,
    FormSubmitButtonDirective,
    FormBaseComponent,
  ],
})
export class SharedModule {}
