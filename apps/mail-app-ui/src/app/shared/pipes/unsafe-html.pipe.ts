import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'unsafeHtml'
})
export class UnsafeHtmlPipe implements PipeTransform {

  constructor(
    private _sanitizer: DomSanitizer
  ) {
  }

  transform(value: string): unknown {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
