import {Component, OnInit} from '@angular/core';
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {MatDialog} from "@angular/material/dialog";
import {
  TemplatePreviewComponent,
  TemplatePreviewDialogData
} from "../../../shared/components/template-preview/template-preview.component";
import {FormGroup} from "@angular/forms";
import {TemplateControllerService} from "../../../shared/open-api";

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
    private _templateService: TemplateControllerService
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
      name: 'Template',
      formFields: this._fb.fields({
        name: this._fb.text({}),
        content: this._fb.template({}),
      }),
      onSubmit: (form: FormGroup) => this.onSubmit(form.value)
    }
  }

  private onSubmit(formValue: any) {
    this._templateService.addTemplate(formValue).subscribe(it => {
      console.log(it);
    })
    console.log(formValue);
  }
}
