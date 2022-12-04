import {Pipe, PipeTransform} from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'startCase'
})
export class StartCasePipe implements PipeTransform {

  transform(value: string): string {
    return _.startCase(value);
  }

}
