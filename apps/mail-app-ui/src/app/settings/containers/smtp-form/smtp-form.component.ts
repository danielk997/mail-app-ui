import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {notificationActions} from "../../../shared/notifications/notification.actions";
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";

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
    private _store: Store
  ) {
  }

  ngOnInit(): void {
    this._store.dispatch(notificationActions.success({message: '121212'}));
    this.initOptions();
  }

  private initOptions() {
    this.options = {
      name: 'Smtp config',
      formFields: this._fb.fields({
        host: this._fb.text({}),
        userName: this._fb.text({}),
        port: this._fb.text({}),
      }),
      type: FormBaseType.CREATE,
      onSubmit: form => {
      }
    }
  }

}
