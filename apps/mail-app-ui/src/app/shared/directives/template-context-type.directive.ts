import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mailAppUiTemplateContextType]'
})
export class TemplateContextTypeDirective<T> {

  @Input() type!: T;

  constructor(
    public template: TemplateRef<T>
  ) {
  }

}
