import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {notificationActions, test123} from "../../../shared/notifications/notification.actions";

@Component({
  selector: 'mail-app-ui-smtp-form',
  templateUrl: './smtp-form.component.html',
  styleUrls: ['./smtp-form.component.scss'],
})
export class SmtpFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this._store.dispatch(notificationActions.success({message: '121212'}));
  }

  private createForm() {
    this.form = this._fb.group({
      host: [''],
      userName: [''],
      password: [''],
      port: ['']
    });
  }
}
