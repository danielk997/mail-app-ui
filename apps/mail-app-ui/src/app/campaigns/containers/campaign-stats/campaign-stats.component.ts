import {Component, OnInit} from '@angular/core';
import {GridOptions} from "../../../shared/components/grid-base/grid-base.component";
import {Observable} from "rxjs";
import {DataAdapter, defaultDataAdapter} from "../../../shared/models/data-adapter";
import {ClickDTO, ViewDTO} from "../../../shared/open-api";
import {Store} from "@ngrx/store";
import {CustomTableColumnBuilder} from "../../../shared/components/grid-base/custom-table-column-bulder";
import {ActivatedRoute} from "@angular/router";
import {campaignStatsActions} from "../../state/campaigns.actions";
import {selectCampaignsClicksList, selectCampaignsViewsList} from "../../state/campaigns.selectors";
import {map} from "rxjs/operators";

@Component({
  selector: 'mail-app-ui-campaign-stats',
  templateUrl: './campaign-stats.component.html',
  styleUrls: ['./campaign-stats.component.scss'],
})
export class CampaignStatsComponent implements OnInit {
  clicksGridOptions!: GridOptions;
  viewsGridOptions!: GridOptions;
  clicksDataAdapter$!: Observable<DataAdapter<ClickDTO>>;
  viewsDataAdapter$!: Observable<DataAdapter<ViewDTO>>;

  constructor(
    private _store: Store,
    private _cb: CustomTableColumnBuilder,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._store.dispatch(campaignStatsActions.load({id: this._route.snapshot.params['id']}));

    this.clicksDataAdapter$ = this._store.select(selectCampaignsClicksList).pipe(
      map(it => ({
          ...defaultDataAdapter(),
          data: it ?? []
        })
      ));

    this.viewsDataAdapter$ = this._store.select(selectCampaignsViewsList).pipe(
      map(it => ({
          ...defaultDataAdapter(),
          data: it ?? []
        })
      ));

    this.initClickGridOptions();
    this.initViewsGridOptions();
  }

  private initClickGridOptions() {
    const columns = this._cb.columns({
      date: this._cb.text({}),
      email: this._cb.text({}),
      url: this._cb.text({}),
    });

    this.clicksGridOptions = {
      columns: columns,
      hideCheckboxColumn: true
    }
  }

  private initViewsGridOptions() {
    const columns = this._cb.columns({
      date: this._cb.text({}),
      email: this._cb.text({}),
    });

    this.viewsGridOptions = {
      columns: columns,
      hideCheckboxColumn: true
    }
  }
}
