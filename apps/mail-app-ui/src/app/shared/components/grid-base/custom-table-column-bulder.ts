import {Injectable, TemplateRef} from "@angular/core";
import * as _ from "lodash";
import {Observable} from "rxjs";
import {ColumnTemplateType, CustomTableColumn, TableActionButton} from "./grid-base.component";

export interface ColumnParams {
  prop?: string;
  minWidth?: number;
  width?: number;
}

export interface DefaultColumnParams extends ColumnParams {
  transformRowValue?: (row: any) => string | Observable<string>;
  onClick?: (row: any) => any;
  rowClass?: (row: any) => string;
}

export interface ActionColumnParams extends ColumnParams {
  buttons: TableActionButton[];
}

export interface LinkColumnParams extends DefaultColumnParams {
  href?: (row: any) => string;
}

export interface TemplateColumnParams extends ColumnParams {
  template: TemplateRef<any>;
}

export interface DefaultProps {
  minWidth?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomTableColumnBuilder {

  columns(columns: ColumnType, defaultProps?: DefaultProps): CustomTableColumn[] {
    return Object.entries(columns).map(it => ({
      name: _.startCase(it[0]),
      prop: it[1].prop ?? it[0],
      minWidth: it[1].minWidth ?? defaultProps?.minWidth ?? 100,
      ...it[1]
    }));
  }

  text(params: DefaultColumnParams): CustomTableColumn {
    return {columnTemplateType: ColumnTemplateType.DEFAULT, ...params};
  }

  actions(params: ActionColumnParams): CustomTableColumn {
    return {columnTemplateType: ColumnTemplateType.ACTIONS, ...params};
  }

  link(params: LinkColumnParams): CustomTableColumn {
    return {columnTemplateType: ColumnTemplateType.LINK, ...params};
  }

  template(params: TemplateColumnParams): CustomTableColumn {
    return {columnTemplateType: ColumnTemplateType.TEMPLATE, ...params};
  }

}

export interface ColumnType {
  [p: string]: CustomTableColumn
}

export const editActionButton = (onClick: (row: any, index: number) => void): TableActionButton => ({
  icon: 'computer',
  tooltip: 'Edit',
  onClick: onClick
});

export const deleteActionButton = (onClick: (row: any, index: number) => void): TableActionButton => ({
  icon: 'delete',
  tooltip: 'Delete',
  onClick: onClick
});
