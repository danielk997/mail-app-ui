import {Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
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
  @ContentChildren(CustomColumnDirective) customColumns!: QueryList<CustomColumnDirective>;
  itemsPerPage: number = 10;
  SelectionType = SelectionType;
  SortType = SortType;

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
}

export interface GridOptions {
  columns: CustomTableColumn[];
  hideTableManagement?: boolean;
}

export enum ColumnTemplateType {
  DEFAULT,
  TAGS,
  ACTIONS,
  LINK
}

export interface CustomTableColumn extends TableColumn {
  columnTemplateType?: ColumnTemplateType;
  buttons?: TableActionButton[];
  transformRowValue?: (row: any) => string | Observable<string>;
  href?: (row: any) => string;
  onClick?: (row: any) => any;
  async?: boolean;
}

export interface TableActionButton {
  onClick: (row: any) => any;
  icon?: string;
  dynamicIcon?: (row: any) => string;
  tooltip?: string;
  dynamicTooltip?: (row: any) => string;
  disabled?: (args: any) => boolean;
}

export class CustomTableColumnBuilder {

  private readonly initProps: CustomTableColumn = {
    columnTemplateType: ColumnTemplateType.DEFAULT,
  }
  private props: CustomTableColumn = this.initProps;

  setProps(options: CustomTableColumn): CustomTableColumnBuilder {
    this.props = {
      ...this.initProps,
      ...options
    }
    return this;
  }

  addProps(options: CustomTableColumn): CustomTableColumnBuilder {
    this.props = {
      ...this.props,
      ...options
    }
    return this;
  }

  addPropsIf(condition: boolean, options: CustomTableColumn): CustomTableColumnBuilder {
    if (condition)
      this.addProps(options);

    return this;
  }

  build(): CustomTableColumn {
    return this.props;
  }
}
