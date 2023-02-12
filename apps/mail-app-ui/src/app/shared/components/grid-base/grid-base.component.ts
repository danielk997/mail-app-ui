import {Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {SortType, TableColumn} from '@swimlane/ngx-datatable';
import {DataAdapter} from '../../models/data-adapter';
import {CustomColumnDirective} from './custom-column.directive';
import {Observable} from "rxjs";

@Component({
  selector: 'mail-app-ui-grid-base',
  templateUrl: './grid-base.component.html',
  styleUrls: ['./grid-base.component.scss'],
})
export class GridBaseComponent {
  ColumnTemplateType = ColumnTemplateType;
  @Input() options!: GridOptions;
  @Input() dataAdapter!: DataAdapter<any>;
  @ContentChildren(CustomColumnDirective) customColumns!: QueryList<CustomColumnDirective>;
  itemsPerPage: number = 10;
  sortType = SortType.single;

  get actionsColumns(): CustomTableColumn[] {
    return this.options.columns.filter(it => it.columnTemplateType === ColumnTemplateType.ACTIONS);
  }

  get textColumns(): CustomTableColumn[] {
    return this.options.columns.filter(it => it.columnTemplateType !== ColumnTemplateType.ACTIONS);
  }
}

export interface GridOptions {
  columns: CustomTableColumn[];
  hideTableManagement?: boolean;
  hideFooter?: boolean;
  hideCheckboxColumn?: boolean;
  styles?: string;
}

export enum ColumnTemplateType {
  DEFAULT,
  ACTIONS,
  LINK,
  TEMPLATE
}


export interface CustomTableColumn extends TableColumn {
  columnTemplateType?: ColumnTemplateType;
  buttons?: TableActionButton[];
  transformRowValue?: (row: any) => string | Observable<string>;
  href?: (row: any) => string;
  rowClass?: (row: any) => string;
  onClick?: (row: any, index: number) => any;
  async?: boolean;
  template?: TemplateRef<any>;
}

export interface TableActionButton {
  onClick: (row: any, index: number) => any;
  icon?: string;
  dynamicIcon?: (row: any) => string;
  tooltip?: string;
  dynamicTooltip?: (row: any) => string;
  disabled?: (args: any) => boolean;
}

