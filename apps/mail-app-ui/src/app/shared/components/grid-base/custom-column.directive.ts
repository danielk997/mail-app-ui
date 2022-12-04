import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[mailAppUiCustomColumn]'
})
export class CustomColumnDirective {

  @Input() name: string = '';

  constructor(
    public templateRef: TemplateRef<any>
  ) { }
}
