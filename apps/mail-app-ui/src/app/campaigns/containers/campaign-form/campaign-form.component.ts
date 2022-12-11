import {Component, OnInit} from '@angular/core';
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {
  TemplatePreviewComponent,
  TemplatePreviewDialogData
} from "../../components/template-preview/template-preview.component";

@Component({
  selector: 'mail-app-ui-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
})
export class CampaignFormComponent implements OnInit {

  options!: FormBaseOptions;
  editorOptions = {language: 'html'};
  message!: string;

  constructor(
    private _fb: FormFieldBuilder,
    private _matDialog: MatDialog,
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
    this.message = value.message ?? '';
  }

  private initOptions() {
    this.options = {
      type: FormBaseType.CREATE,
      name: 'Campaign',
      formFields: this._fb.fields({
        name: this._fb.text({}),
        message: this._fb.template({}),
      }),
      onSubmit: (form: FormGroup) => this.onSubmit(form.value)
    }
  }

  private onSubmit(formValue: any) {
    console.log(formValue);
  }
}
