import {Component, OnInit} from '@angular/core';
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {MatDialog} from "@angular/material/dialog";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {actionBarCreateButton} from "../../../shared/components/action-bar/helpers";
import {ActivatedRoute, Router} from "@angular/router";
import {
  CustomTableColumnBuilder,
  editActionButton
} from "../../../shared/components/grid-base/custom-table-column-bulder";
import {GridOptions} from "../../../shared/components/grid-base/grid-base.component";
import {Observable} from "rxjs";
import {DataAdapter} from "../../../shared/models/data-adapter";
import {TemplateDTO} from "../../../shared/open-api";
import {Store} from "@ngrx/store";
import {templatesCreateActions, templatesLoadActions, templatesUpdateActions} from "../../state/templates.actions";
import {selectTemplatesList} from "../../state/templates.selectors";
import {ImageUploadComponent} from "../../components/image-upload/image-upload.component";

@Component({
  selector: 'mail-app-ui-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  message!: string;
  options!: ActionBarOptions;
  gridOptions!: GridOptions;
  dataAdapter$!: Observable<DataAdapter<TemplateDTO>>;

  constructor(
    private _fb: FormFieldBuilder,
    private _matDialog: MatDialog,
    private _router: Router,
    private _store: Store,
    private _route: ActivatedRoute,
    private _cb: CustomTableColumnBuilder
  ) {
  }


  ngOnInit(): void {
    this.initOptions();
    this.initGridOptions();
    this._store.dispatch(templatesLoadActions.load({}));
    this.dataAdapter$ = this._store.select(selectTemplatesList);
  }

  private initOptions() {
    this.options = {
      buttons: [
        actionBarCreateButton(() => {
          this._store.dispatch(templatesCreateActions.create({}))
        }),
        {
          icon: 'upload',
          text: 'Upload Image',
          onClick: () => {
            this._matDialog.open(ImageUploadComponent)
          }
        }
      ]
    }
  }

  private initGridOptions() {
    const columns = this._cb.columns({
      name: this._cb.text({}),
      actions: this._cb.actions({
        buttons: [
          editActionButton((row: TemplateDTO) => {
            this._store.dispatch(templatesUpdateActions.loadDataToUpdate({id: row.id!}))
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
