import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as _ from "lodash";

@Component({
  selector: 'mail-app-pick-list[options]',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickListComponent),
      multi: true
    }
  ]
})
export class PickListComponent implements OnInit, OnChanges, ControlValueAccessor {

  private _allData!: any[];
  @Input() valueProperty!: string;
  @Input() keyProperty?: string;
  @Input() sortField!: string;
  @Input() options!: any[];
  @Input() value: any[] = [];
  @Input() leftBoxLabel?: string;
  @Input() rightBoxLabel?: string;
  visibleOptions!: any[];
  visibleValues!: any[];
  optionsForm!: FormGroup;
  valueForm!: FormGroup;

  private onChange!: (
    value: any
  ) => void;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.updateFormValue();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.updateFormValue();
  }

  moveToRight() {
    this.optionsFormSelectValue?.forEach(it => {
      this.value = [...this.value, it];
      this.options = _.without(this.options, it)
    });
    this.updateVisibleOptions();
    this.resetOptionsFormSelect();
    this.updateValue();
    this.valueChanged();
  }

  moveAllToRight() {
    this.visibleOptions.forEach(it => {
      this.value = [...this.value, it];
      this.options = _.without(this.options, it)
    });
    this.updateVisibleOptions();
    this.resetOptionsFormSelect();
    this.updateValue();
    this.valueChanged();
  }

  moveToLeft() {
    this.valueFormSelectValue?.forEach(it => {
      this.options = [...this.options, it];
      this.value = _.without(this.value, it);
    });
    this.updateVisibleValue();
    this.resetValueFormSelect();
    this.updateOptions();
    this.valueChanged();
  }

  moveAllToLeft() {
    this.visibleValues.forEach(it => {
      this.options = [...this.options, it];
      this.value = _.without(this.value, it);
    });
    this.updateVisibleValue();
    this.resetValueFormSelect();
    this.updateOptions();
    this.valueChanged();
  }

  onOptionsFilter() {
    this.updateVisibleOptions();
  }

  onValueFilter() {
    this.updateVisibleValue();
  }

  get valueFormSelectValue(): any[] | undefined {
    return this.valueForm?.value.select;
  }

  get optionsFormSelectValue(): any[] | undefined {
    return this.optionsForm?.value.select;
  }

  get optionsFormFilterValue(): string {
    return this.optionsForm?.value.filter;
  }

  get valueFormFilterValue(): string {
    return this.valueForm?.value.filter;
  }

  private updateFormValue() {
    this._allData = [...this.options, ...this.value];
    this.updateOptions();
    this.updateValue();
    setTimeout(() => {
      this.valueChanged();
    }, 0);
  }

  private resetOptionsFormSelect() {
    this.optionsForm.patchValue({
      select: [],
    });
  }

  private resetValueFormSelect() {
    this.valueForm.patchValue({
      select: [],
    });
  }

  private updateOptions() {
    const options = _.xorBy(this._allData, this.value, it => this.valueProperty ? it[this.valueProperty] : it);
    this.options = this.sort(options);
    this.updateVisibleOptions();
  }

  private updateVisibleOptions() {
    this.visibleOptions = this.options.filter(it => `${this.valueProperty ? it[this.valueProperty] : it}`.toLowerCase().includes(this.optionsFormFilterValue?.toLowerCase()));
  }

  private updateValue() {
    const value = _.xorBy(this._allData, this.options, it => this.valueProperty ? it[this.valueProperty] : it);
    this.value = this.sort(value);
    this.updateVisibleValue();
  }

  private updateVisibleValue() {
    this.visibleValues = this.value.filter(it => `${this.valueProperty ? it[this.valueProperty] : it}`.toLowerCase().includes(this.valueFormFilterValue?.toLowerCase()));
  }

  private sort(items: any[]): any[] {
    return _.sortBy(
      items,
      it => `${this.valueProperty ? it[this.sortField ?? this.valueProperty] : it}`.trim().toLowerCase());
  }

  private createForm() {
    this.optionsForm = this._fb.group({
      filter: '',
      select: [[]],
    });
    this.valueForm = this._fb.group({
      filter: '',
      select: [[]],
    });
  }

  valueChanged() {
    if (this.onChange) {
      this.onChange(this.keyProperty ? this.value.map(it => it[this.keyProperty!]) : this.value);
    }
  }

  registerOnChange(
    fn: (value: any) => void
  ): void {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    console.log('VW', value);

    if (!value || _.isEqual(value, this.value))
      return


    this.value = value;
    this.updateFormValue();
  }

  registerOnTouched(_fn: any): void {
    // This is intentional empty method
  }
}
