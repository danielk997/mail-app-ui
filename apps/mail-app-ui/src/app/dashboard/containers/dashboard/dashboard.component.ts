import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {DataAdapter} from "../../../shared/models/data-adapter";
import {SelectionType, TableColumn} from "@swimlane/ngx-datatable";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {GridOptions} from "../../../shared/components/grid-base/grid-base.component";
import {MatDialog} from "@angular/material/dialog";
import {
  CustomTableColumnBuilder,
  editActionButton
} from "../../../shared/components/grid-base/custom-table-column-bulder";
import {ColumnHelper} from '../../../shared/helpers/column-helper';
import {GroupsFormComponent} from "../groups-form/groups-form.component";
import {selectReceiversList} from "../../state/receivers/receivers.selectors";
import {receiversCreateActions, receiversLoadActions} from "../../state/receivers/receivers.actions";
import {selectGroupsList} from "../../state/groups/groups.selectors";
import {groupsCreateActions, groupsLoadActions, groupsUpdateActions} from "../../state/groups/groups.actions";

@Component({
  selector: 'mail-app-ui-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  data$!: Observable<any[]>;
  dataAdapter$!: Observable<DataAdapter<any>>;
  groupsDataAdapter$!: Observable<DataAdapter<any>>;
  columns!: TableColumn[];
  ColumnHelper = ColumnHelper;
  SelectionType = SelectionType;
  receiversActionBarOptions!: ActionBarOptions;
  groupsActionBarOptions!: ActionBarOptions;
  gridOptions!: GridOptions;
  groupsGridOptions!: GridOptions;
  selected: any[] = [];

  constructor(
    private _columnHelper: ColumnHelper,
    private _matDialog: MatDialog,
    private _store: Store,
    private _cb: CustomTableColumnBuilder
  ) {
  }

  ngOnInit(): void {
    this._store.dispatch(receiversLoadActions.load({}))
    this._store.dispatch(groupsLoadActions.load({}))
    this.dataAdapter$ = this._store.select(selectReceiversList);
    this.groupsDataAdapter$ = this._store.select(selectGroupsList);
    this.initReceiversActionBarOptions();
    this.initGroupsActionBarOptions();
    this.initGridOptions();
    this.initGroupGridOptions();
  }

  private initReceiversActionBarOptions() {
    this.receiversActionBarOptions = {
      buttons: [
        {
          text: 'Add',
          icon: 'add',
          onClick: () => {
            this._store.dispatch(receiversCreateActions.create({}));
          }
        }
      ]
    }
  }

  private initGroupsActionBarOptions() {
    this.groupsActionBarOptions = {
      buttons: [
        {
          text: 'Add',
          icon: 'add',
          onClick: () => {
            this._store.dispatch(groupsCreateActions.create({}));
          }
        }
      ]
    }
  }

  private initGridOptions() {
    const columns = this._cb.columns({
      name: this._cb.text({}),
      email: this._cb.text({}),
      actions: this._cb.actions({
        buttons: [
          editActionButton(row => {
            this._store.dispatch(groupsUpdateActions.loadDataToUpdate({id: row.id}));
          }),
        ]
      }),
    });

    this.gridOptions = {
      columns: columns,
      hideCheckboxColumn: true
    }
  }

  private initGroupGridOptions() {
    const columns = this._cb.columns({
      name: this._cb.text({}),
      actions: this._cb.actions({
        buttons: [
          editActionButton(row => {
            this._store.dispatch(groupsUpdateActions.loadDataToUpdate({id: row.id}));
          }),
        ]
      }),
    });

    this.groupsGridOptions = {
      columns: columns,
      hideCheckboxColumn: true
    }
  }
}
