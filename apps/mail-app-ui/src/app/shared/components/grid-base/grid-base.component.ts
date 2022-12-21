import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef} from '@angular/core';
import {SelectionType, SortType, TableColumn} from '@swimlane/ngx-datatable';
import { DataAdapter } from '../../models/data-adapter';
import { CustomColumnDirective } from './custom-column.directive';
import {Observable} from "rxjs";

@Component({
  selector: 'mail-app-ui-grid-base',
  templateUrl: './grid-base.component.html',
  styleUrls: ['./grid-base.component.scss'],
})
export class GridBaseComponent implements OnInit {
  ColumnTemplateType = ColumnTemplateType;
  @Input() options!: GridOptions;
  @Input() dataAdapter!: DataAdapter<any>;
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @ContentChildren(CustomColumnDirective) customColumns!: QueryList<CustomColumnDirective>;
  itemsPerPage: number = 10;
  selected: any[] = [];
  selectionType = SelectionType.checkbox;
  sortType = SortType.single;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  onItemPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
  }

  get actionsColumns(): CustomTableColumn[] {
    return this.options.columns.filter(it => it.columnTemplateType === ColumnTemplateType.ACTIONS);
  }

  get textColumns(): CustomTableColumn[] {
    return this.options.columns.filter(it => it.columnTemplateType !== ColumnTemplateType.ACTIONS);
  }

  onSelectionChange(data: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...data.selected);
    this.selectionChange.emit(this.selected);
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

