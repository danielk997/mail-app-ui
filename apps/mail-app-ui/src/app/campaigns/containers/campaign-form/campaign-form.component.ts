import {Component, Inject, OnInit} from '@angular/core';
import {FormBaseData, FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {campaignCreateActions, campaignUpdateActions} from "../../state/campaigns.actions";
import {CampaignDTO} from "../../../shared/open-api";
import {selectCampaignToUpdate} from "../../state/campaigns.selectors";

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
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: FormBaseData<CampaignDTO>
  ) {
  }


  ngOnInit(): void {
    this.initOptions();
  }

  onValueChanged(value: any) {
    this.message = value.message ?? '';
  }

  private initOptions() {
    this.options = {
      type: this.data.formType,
      name: 'Campaign',
      formFields: this._fb.fields({
        name: this._fb.text({}),
      }),
      dataToUpdate$: this._store.select(selectCampaignToUpdate),
      onSubmit: (form: FormGroup) => this.onSubmit(form.value)
    }
  }

  private onSubmit(formValue: any) {
    if (this.data.formType === FormBaseType.CREATE)
      this._store.dispatch(campaignCreateActions.createSubmitted({data: formValue}))
    else
      this._store.dispatch(campaignUpdateActions.updateSubmitted({
        id: this.data.dto?.data?.id!,
        data: formValue
      }))
  }
}
