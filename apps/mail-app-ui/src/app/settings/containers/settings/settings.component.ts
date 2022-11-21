import {Component, OnInit} from '@angular/core';
import {SmtpConfigurationControllerService} from "../../../shared/open-api";
import {Observable, of} from "rxjs";
import {ColumnHelper} from "../../../shared/helpers/column-helper";
import {SelectionType, TableColumn} from "@swimlane/ngx-datatable";

const data1 = of([
  {name: 'x1', id: 1},
  {name: 'x2', id: 2},
  {name: 'x3', id: 3},
  {name: 'x4', id: 4},
  {name: 'x5', id: 5},
  {name: 'x6', id: 6},
  {name: 'x7', id: 7},
  {name: 'x8', id: 8},
  {name: 'x9', id: 9},
])

@Component({
  selector: 'mail-app-ui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  data$!: Observable<any[]>;
  columns!: TableColumn[];
  ColumnHelper = ColumnHelper;
  SelectionType = SelectionType;

  constructor(
    private _service: SmtpConfigurationControllerService,
    private _columnHelper: ColumnHelper
  ) {
  }

  ngOnInit(): void {
    this.data$ = data1;
    this.data$.subscribe(it => this.columns = this._columnHelper.getColumns(it))
  }

  rowIdentity(row: any) {
    return row.name;
  }

}
