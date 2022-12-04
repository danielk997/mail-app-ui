import {Component, OnInit} from '@angular/core';
import {SmtpConfigurationControllerService} from "../../../shared/open-api";
import {Observable, of} from "rxjs";
import {ColumnHelper} from "../../../shared/helpers/column-helper";
import {SelectionType, TableColumn} from "@swimlane/ngx-datatable";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {MatDialog} from "@angular/material/dialog";
import {SmtpFormComponent} from "../smtp-form/smtp-form.component";
import {Store} from "@ngrx/store";
import {smtpConfigLoadActions} from "../../state/smtp-config.actions";

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
  options!: ActionBarOptions;
  selected: any[] = [];

  constructor(
    private _service: SmtpConfigurationControllerService,
    private _columnHelper: ColumnHelper,
    private _matDialog: MatDialog,
    private _store: Store
  ) {
  }

  ngOnInit(): void {
    this.data$ = this._service.getAll1();
    this.initOptions();
    this._store.dispatch(smtpConfigLoadActions.load({}));
  }

  rowIdentity(row: any) {
    return row.name;
  }

  onSelect(event: { selected: any }) {
    this.selected = event.selected;
  }

  private initOptions() {
    this.options = {
      buttons: [
        {
          text: 'Add',
          icon: 'add',
          onClick: (selectedItem: any[]) => {
            console.log('CLICK', selectedItem);
            this._matDialog.open(SmtpFormComponent);
          }
        },
        {
          text: 'Update',
          icon: 'computer',
          onClick: (selectedItem: any[]) => {
            this._matDialog.open(SmtpFormComponent);
          }
        },
        {
          text: 'Delete',
          icon: 'delete',
          onClick: () => {
          }
        }
      ]
    }
  }
}
