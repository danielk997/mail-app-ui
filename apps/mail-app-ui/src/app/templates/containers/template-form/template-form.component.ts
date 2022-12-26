import {Component, Inject, OnInit} from '@angular/core';
import {FormBaseData, FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {
  TemplatePreviewComponent,
  TemplatePreviewDialogData
} from "../../../shared/components/template-preview/template-preview.component";
import {FormGroup} from "@angular/forms";
import {TemplateControllerService, TemplateDTO} from "../../../shared/open-api";
import {Store} from "@ngrx/store";
import {templatesCreateActions, templatesUpdateActions} from "../../state/templates.actions";
import {selectTemplateToUpdate} from "../../state/templates.selectors";

@Component({
  selector: 'mail-app-ui-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  options!: FormBaseOptions;
  editorOptions = {language: 'html'};
  message!: string;

  constructor(
    private _fb: FormFieldBuilder,
    private _matDialog: MatDialog,
    private _templateService: TemplateControllerService,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: FormBaseData<TemplateDTO>
  ) {
  }


  ngOnInit(): void {
    this.initOptions();
  }

  onPreview() {
    this._matDialog.open<TemplatePreviewComponent, TemplatePreviewDialogData>(TemplatePreviewComponent, {
      width: '600px',
      height: '80vh',
      data: {
        html: this.message
      }
    });
  }

  onValueChanged(value: any) {
    this.message = value.content ?? '';
  }

  private initOptions() {
    this.options = {
      type: this.data.formType,
      name: 'Template',
      formFields: this._fb.fields({
        name: this._fb.text({}),
        content: this._fb.template({}),
      }),
      dataToUpdate$: this._store.select(selectTemplateToUpdate),
      onSubmit: (form: FormGroup) => this.onSubmit(form.value)
    }
  }

  private onSubmit(formValue: any) {
    if (this.data.formType === FormBaseType.CREATE)
      this._store.dispatch(templatesCreateActions.createSubmitted({data: formValue}))
    else
      this._store.dispatch(templatesUpdateActions.updateSubmitted({
        id: this.data.dto?.data?.id!,
        data: formValue
      }))
  }
}
