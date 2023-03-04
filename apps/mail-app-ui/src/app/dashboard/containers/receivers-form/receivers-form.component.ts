import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {Store} from "@ngrx/store";
import {ReceiverControllerService} from "../../../shared/open-api/api/receiver-controller.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CommonFormData} from "../../../shared/state/helpers/service-handler";

@Component({
  selector: 'mail-app-ui-receivers-form',
  templateUrl: './receivers-form.component.html',
  styleUrls: ['./receivers-form.component.scss'],
})
export class ReceiversFormComponent implements OnInit {
  form!: FormGroup;
  options!: FormBaseOptions;

  constructor(
    private _fb: FormFieldBuilder,
    private _store: Store,
    private _service: ReceiverControllerService,
    @Inject(MAT_DIALOG_DATA) public data: CommonFormData
  ) {
  }

  ngOnInit(): void {
    this.initOptions();
  }

  private initOptions() {
    this.options = {
      name: 'Receiver',
      formFields: this._fb.fields({
        name: this._fb.text({validators: [Validators.required]}),
        email: this._fb.text({validators: [Validators.required]}),
      }),
      type: this.data.type,
      onSubmit: (form: FormGroup) => {
        this.data.onClick(form.value);
      },
      dataToUpdate$: this.data.dataToUpdate$
    }
  }

}
