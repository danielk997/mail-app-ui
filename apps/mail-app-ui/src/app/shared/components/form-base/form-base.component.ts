import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import * as _ from "lodash";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {FormFieldDirective} from './form-field.directive';
import {FormSubmitButtonDirective} from './form-submit-button.directive';
import {AnyControlType, ControlType, FormField} from './form-field-builder';
import {DataFormAdapter} from "../../models/data-adapter";

export enum FormBaseType {
  CREATE = 'Create',
  UPDATE = 'Update'
}

export enum FormValueStrategy {
  ALL,
  TAB
}

export interface FormBaseData {
  formType: FormBaseType;
  id?: string;
}

export interface FormBaseOptions {
  type: FormBaseType;
  name: string;
  formFields: FormField<any>[];
  onSubmit: (form: FormGroup) => any;
  dataToUpdate$?: Observable<DataFormAdapter<any>>;
  tabs?: string[];
  valueStrategy?: FormValueStrategy;
}

export enum FormFieldType {
  CONTROL,
  ARRAY
}

@Component({
  selector: 'mail-app-ui-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss'],
})
export class FormBaseComponent implements OnInit {

  @Input() options!: FormBaseOptions;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(FormFieldDirective) formFields!: QueryList<FormFieldDirective>;
  @ContentChildren(FormSubmitButtonDirective) formSubmitButtonDirective!: QueryList<FormSubmitButtonDirective>;
  form!: FormGroup;
  isLoading = true;
  FormBaseType = FormBaseType;
  selectedTab?: string;
  FormValueStrategy = FormValueStrategy;
  ControlType = ControlType;
  templateContextType!: { $implicit: FormField<AnyControlType> };
  Validators = Validators;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    if (this.options.tabs) {
      this.selectedTab = this.options.tabs[0];
    }

    this.createForm();

    if (this.options.type === FormBaseType.UPDATE && this.options.dataToUpdate$) {
      this.isLoading = true;
      this.options.dataToUpdate$.pipe(
        filter(it => !_.isEmpty(it.data))
      ).subscribe(it => {
        this.form.patchValue(it.data);
        this.hideLoader();
      });
    } else {
      this.hideLoader();
    }

    this.form.valueChanges.subscribe(value => this.valueChanged.emit(value))
  }

  onTabChange(ev: MatTabChangeEvent) {
    this.selectedTab = ev.tab.textLabel;
    if (this.options.valueStrategy === FormValueStrategy.TAB)
      this.createForm()
  }


  filterByTab(formFields: FormField[], tabName: string): FormField[] {
    return formFields.filter(it => Array.isArray(it.tabName) ? it.tabName.includes(tabName) : it.tabName === tabName);
  }

  getFormFieldTemplate(name: string): FormFieldDirective | undefined {
    return this.formFields.find(it => it.formFieldName === name);
  }

  isObservable(options: any): boolean {
    return options instanceof Observable;
  }

  private createForm() {
    this.form = this.fb.group({});

    if (this.options.tabs && this.options?.valueStrategy === FormValueStrategy.TAB) {
      this.options.formFields
        .filter(it => Array.isArray(it.tabName) ? it.tabName.includes(this.selectedTab ?? '') : it.tabName === this.selectedTab)
        .forEach(it => this.addControl(it));
    } else {
      this.options.formFields.forEach(it => this.addControl(it));
    }
  }

  private addControl(field: FormField) {
    if (field.type === FormFieldType.ARRAY)
      this.form.addControl(field.name, this.fb.array(field.value, field.validators));

    this.form.addControl(field.name, this.fb.control(field.value, field.validators));
  }

  private hideLoader() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}

