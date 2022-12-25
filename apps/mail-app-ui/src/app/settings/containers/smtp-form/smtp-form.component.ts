import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder, TextType} from "../../../shared/components/form-base/form-field-builder";
import {SmtpConfigurationControllerService} from "../../../shared/open-api";

@Component({
  selector: 'mail-app-ui-smtp-form',
  templateUrl: './smtp-form.component.html',
  styleUrls: ['./smtp-form.component.scss'],
})
export class SmtpFormComponent implements OnInit {

  form!: FormGroup;
  options!: FormBaseOptions;

  constructor(
    private _fb: FormFieldBuilder,
    private _store: Store,
    private smtpService: SmtpConfigurationControllerService
  ) {
  }

  ngOnInit(): void {
    this.initOptions();
  }

  private initOptions() {
    this.options = {
      name: 'Smtp config',
      formFields: this._fb.fields({
        host: this._fb.text({validators: [Validators.required]}),
        userName: this._fb.text({validators: [Validators.required]}),
        port: this._fb.text({validators: [Validators.required]}),
        password: this._fb.text({params: {type: TextType.PASSWORD}, validators: [Validators.required]}),
      }),
      type: FormBaseType.CREATE,
      onSubmit: (form: FormGroup) => {
        this.smtpService.add(form.value).subscribe();
      }
    }
  }

}
