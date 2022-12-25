import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {campaignCreateActions, campaignSendActions, campaignsLoadActions} from "../../state/campaigns.actions";
import {CampaignDTO} from "../../../shared/open-api";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {GridOptions} from "../../../shared/components/grid-base/grid-base.component";
import {Observable} from "rxjs";
import {DataAdapter} from "../../../shared/models/data-adapter";
import {
  CustomTableColumnBuilder,
  deleteActionButton,
  editActionButton
} from "../../../shared/components/grid-base/custom-table-column-bulder";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {selectCampaignsList} from "../../state/campaigns.selectors";

@Component({
  selector: 'mail-app-ui-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {

  options!: ActionBarOptions;
  gridOptions!: GridOptions;
  dataAdapter$!: Observable<DataAdapter<CampaignDTO>>;


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
    this._store.dispatch(campaignsLoadActions.load({}));
    this.dataAdapter$ = this._store.select(selectCampaignsList);
  }

  private initOptions() {
    this.options = {
      buttons: [
        {
          text: 'Create Campaign',
          icon: 'add',
          onClick: () => {
            this._store.dispatch(campaignCreateActions.create());
          }
        },
        {
          text: 'Send Campaign',
          icon: 'launch',
          onClick: () => {
            this._store.dispatch(campaignSendActions.init());
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
