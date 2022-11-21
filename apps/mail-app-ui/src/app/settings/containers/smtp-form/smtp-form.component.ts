import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'mail-app-ui-smtp-form',
  templateUrl: './smtp-form.component.html',
  styleUrls: ['./smtp-form.component.scss'],
})
export class SmtpFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
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
