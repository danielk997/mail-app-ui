import {Component, OnInit} from '@angular/core';
import {SmtpConfigurationControllerService} from "../../../shared/open-api";
import {Observable} from "rxjs";
import {ColumnHelper} from "../../../shared/helpers/column-helper";
import {SelectionType, TableColumn} from "@swimlane/ngx-datatable";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {MatDialog} from "@angular/material/dialog";
import {SmtpFormComponent} from "../smtp-form/smtp-form.component";
import {Store} from "@ngrx/store";
import {smtpConfigLoadActions} from "../../state/smtp-config.actions";

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
