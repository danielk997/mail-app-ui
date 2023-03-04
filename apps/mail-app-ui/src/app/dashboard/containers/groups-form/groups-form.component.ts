import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CommonFormData} from "../../../shared/state/helpers/service-handler";
import {Observable, zip} from "rxjs";
import {PersonDTO} from "../../../shared/open-api";
import {selectReceiversList} from "../../state/receivers/receivers.selectors";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'mail-app-ui-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.scss'],
})
export class GroupsFormComponent implements OnInit {
  form!: FormGroup;
  options!: FormBaseOptions;
  receivers$!: Observable<PersonDTO[]>;

  constructor(
    private _fb: FormFieldBuilder,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: CommonFormData
  ) {
  }

  ngOnInit(): void {
    this.initOptions();
    this.receivers$ = this._store.select(selectReceiversList).pipe(
      map(it => it.data)
    );
  }

  private initOptions() {
    this.options = {
      name: 'Group',
      formFields: this._fb.fields({
        name: this._fb.text({validators: [Validators.required]}),
        receivers: this._fb.template({validators: [Validators.required]}),
      }),
      type: this.data.type,
      onSubmit: (form: FormGroup) => {
        this.data.onClick(form.value);
      },
      dataToUpdate$: this.data.dataToUpdate$
    }
  }

}
