import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appFormSubmitButton]'
})
export class FormSubmitButtonDirective {

  @Input() tabName?: string | string[];

  constructor(
    public templateRef: TemplateRef<any>
  ) {
  }
}
