import {Component, OnInit} from '@angular/core';
import {GridOptions} from "../../../shared/components/grid-base/grid-base.component";
import {Observable} from "rxjs";
import {DataAdapter} from "../../../shared/models/data-adapter";
import {CampaignDTO, SentCampaignDTO} from "../../../shared/open-api";
import {CustomTableColumnBuilder} from "../../../shared/components/grid-base/custom-table-column-bulder";
import {campaignSendActions, campaignStatsActions} from "../../state/campaigns.actions";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {selectSentCampaignsList} from "../../state/campaigns.selectors";

@Component({
  selector: 'mail-app-ui-campaigns-sent',
  templateUrl: './campaigns-sent.component.html',
  styleUrls: ['./campaigns-sent.component.scss'],
})
export class CampaignsSentComponent implements OnInit {

  gridOptions!: GridOptions;
  dataAdapter$!: Observable<DataAdapter<SentCampaignDTO>>;

  constructor(
    private _store: Store,
    private _cb: CustomTableColumnBuilder,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._store.dispatch(campaignSendActions.loadsent({id: parseInt(this._route.snapshot.params['id'])}))
    this.dataAdapter$ = this._store.select(selectSentCampaignsList);
    this.initGridOptions();
  }

  private initGridOptions() {
    const columns = this._cb.columns({
      date: this._cb.text({}),
      actions: this._cb.actions({
        buttons: [
          {
            icon: 'assessment',
            tooltip: 'Stats',
            onClick: (row: SentCampaignDTO) => {
              this._store.dispatch(campaignStatsActions.load({id: row.id ?? ''}));
            }
          },
        ]
      }),
    });

    this.gridOptions = {
      columns: columns,
      hideCheckboxColumn: true
    }
  }
}
