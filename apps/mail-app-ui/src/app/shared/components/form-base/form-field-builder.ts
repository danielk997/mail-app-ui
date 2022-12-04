import {Observable} from "rxjs";
import {KeyValue} from "@angular/common";
import {ValidatorFn} from "@angular/forms";
import {Injectable} from "@angular/core";
import {FormFieldType} from "./form-base.component";

export enum ControlType {
  TEMPLATE,
  TEXT,
  DROPDOWN,
  MULTI_DROPDOWN,
  CHECKBOX,
  TEXT_AREA
}

export enum TextType {
  PASSWORD
}

export interface InputParams {
  label?: string;
}

export interface TextInputParams extends InputParams {
  type: TextType
}

export interface DropdownParams<T = unknown> extends InputParams {
  options: {
    data: T[] | Observable<T[]>;
    valueProp?: string;
    displayProp?: string;
  }
}

export interface MultiDropdownParams extends InputParams {
  options: Observable<KeyValue<string, string>[]>
}

export type FormFieldParams<T> = T extends ControlType.TEMPLATE ? never :
  T extends ControlType.TEXT ? TextInputParams :
    T extends ControlType.DROPDOWN ? DropdownParams :
      T extends ControlType.MULTI_DROPDOWN ? MultiDropdownParams :
        InputParams;

export interface FormField<T extends ControlType = ControlType.TEMPLATE> {
  name: string;
  validators?: ValidatorFn[];
  value?: any;
  tabName?: string | string[];
  type?: FormFieldType;
  controlType?: ControlType;
  options?: any;
  params?: FormFieldParams<T>;
}

export type AnyControlType =
  ControlType.TEXT
  | ControlType.TEMPLATE
  | ControlType.DROPDOWN
  | ControlType.MULTI_DROPDOWN
  | ControlType.CHECKBOX
  | ControlType.TEXT_AREA;

export type FieldBuilderField<T extends ControlType = ControlType.TEMPLATE> = Omit<FormField<T>, 'name'>;

export interface FieldType {
  [p: string]: FieldBuilderField<AnyControlType>
}

@Injectable({
  providedIn: 'root'
})
export class FormFieldBuilder {

  fields(fields: FieldType): FormField<AnyControlType>[] {
    return Object.entries(fields).map(it => ({name: it[0], ...it[1]}));
  }

  text(params: FieldBuilderField<ControlType.TEXT>): FieldBuilderField<ControlType.TEXT> {
    return {controlType: ControlType.TEXT, ...params};
  }

  dropdown(params: FieldBuilderField<ControlType.DROPDOWN>): FieldBuilderField<ControlType.DROPDOWN> {
    return {controlType: ControlType.DROPDOWN, ...params};
  }

  multiDropdown(params: FieldBuilderField<ControlType.MULTI_DROPDOWN>): FieldBuilderField<ControlType.MULTI_DROPDOWN> {
    return {controlType: ControlType.MULTI_DROPDOWN, ...params};
  }

  checkbox(params: FieldBuilderField<ControlType.CHECKBOX>): FieldBuilderField<ControlType.CHECKBOX> {
    return {controlType: ControlType.CHECKBOX, ...params};
  }

  textArea(params: FieldBuilderField<ControlType.TEXT_AREA>): FieldBuilderField<ControlType.TEXT_AREA> {
    return {controlType: ControlType.TEXT_AREA, ...params};
  }

  template(params: FieldBuilderField): FieldBuilderField {
    return params;
  }
}
