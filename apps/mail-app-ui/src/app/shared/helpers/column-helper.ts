import {TableColumn} from "@swimlane/ngx-datatable";
import * as _ from "lodash";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ColumnHelper {

  getColumns<T extends any[]>(data: T): TableColumn[] {
    if (!data)
      return [];

    return Object.keys(data[0]).map(it => ({
      prop: _.camelCase(it),
      name: _.startCase(it)
    }))
  }
}
