import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appFormField]'
})
export class FormFieldDirective {

  @Input() formFieldName!: string;
  @Input() tabName?: string | string[];

  constructor(
    public templateRef: TemplateRef<any>,
  ) {
  }

}
