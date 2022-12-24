import {Component, OnInit} from '@angular/core';
import {SmtpConfigurationDTO} from "../../../shared/open-api";
import {Observable} from "rxjs";
import {ColumnHelper} from "../../../shared/helpers/column-helper";
import {SelectionType, TableColumn} from "@swimlane/ngx-datatable";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {MatDialog} from "@angular/material/dialog";
import {SmtpFormComponent} from "../smtp-form/smtp-form.component";
import {Store} from "@ngrx/store";
import {smtpConfigLoadActions} from "../../state/smtp-config.actions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {selectSmtpConfigList} from "../../state/smtp-config.selectors";
import {
  CustomTableColumnBuilder,
  deleteActionButton,
  editActionButton
} from "../../../shared/components/grid-base/custom-table-column-bulder";
import {GridOptions} from "../../../shared/components/grid-base/grid-base.component";
import {DataAdapter} from "../../../shared/models/data-adapter";

@Component({
  selector: 'mail-app-ui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  data$!: Observable<any[]>;
  dataAdapter$!: Observable<DataAdapter<SmtpConfigurationDTO>>;
  columns!: TableColumn[];
  ColumnHelper = ColumnHelper;
  SelectionType = SelectionType;
  options!: ActionBarOptions;
  gridOptions!: GridOptions;
  selected: any[] = [];
  editorOptions = {theme: 'vs-dark', language: 'html'};
  form!: FormGroup;

  constructor(
    private _columnHelper: ColumnHelper,
    private _matDialog: MatDialog,
    private _store: Store,
    private _fb: FormBuilder,
    private _cb: CustomTableColumnBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      test: ['']
    })
    this.initOptions();
    this.initGridOptions();
    this._store.dispatch(smtpConfigLoadActions.load({}));
    this.dataAdapter$ = this._store.select(selectSmtpConfigList);
    this.dataAdapter$.subscribe(it => {
      console.log(it);
    })
  }

  rowIdentity(row: any) {
    return row.name;
  }

  onSelect(event: { selected: any }) {
    this.selected = event.selected;
  }

  onClick() {
    console.log(this.form.value);
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

  private initGridOptions() {
    const columns = this._cb.columns({
      host: this._cb.text({}),
      userName: this._cb.text({}),
      port: this._cb.text({}),
      active: this._cb.text({}),
      actions: this._cb.actions({
        buttons: [
          editActionButton(() => {
          }),
          deleteActionButton(() => {
          }),
        ]
      }),
    });

    this.gridOptions = {
      columns: columns,
      hideCheckboxColumn: true
    }
  }
}
