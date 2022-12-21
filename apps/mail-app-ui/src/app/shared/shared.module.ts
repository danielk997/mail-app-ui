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
import { GridBaseComponent } from './components/grid-base/grid-base.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomColumnDirective } from './components/grid-base/custom-column.directive';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { RouterModule } from '@angular/router';
import { UnsafeHtmlPipe } from './pipes/unsafe-html.pipe';
import { TemplatePreviewComponent } from './components/template-preview/template-preview.component';
import {APIS} from "./open-api";

@NgModule({
  declarations: [
    ActionBarComponent,
    FormBaseComponent,
    FormFieldDirective,
    FormSubmitButtonDirective,
    TemplateContextTypeDirective,
    StartCasePipe,
    ConfirmDialogComponent,
    GridBaseComponent,
    CustomColumnDirective,
    UnsafeHtmlPipe,
    TemplatePreviewComponent,
  ],
  imports: [
    ...MATERIALS,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule,
    MonacoEditorModule.forRoot(),
  ],
    exports: [
        ...MATERIALS,
        ActionBarComponent,
        FormFieldDirective,
        FormSubmitButtonDirective,
        FormBaseComponent,
        RouterModule,
        ReactiveFormsModule,
        MonacoEditorModule,
        UnsafeHtmlPipe,
        GridBaseComponent,
    ],
})
export class SharedModule {}
