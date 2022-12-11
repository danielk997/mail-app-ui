import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {campaignCreateActions, x123} from "../../state/campaigns.actions";
import {CampaignControllerService} from "../../../shared/open-api";

@Component({
  selector: 'mail-app-ui-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {

  constructor(
    private _store: Store,
    private _service: CampaignControllerService
  ) {
  }

  ngOnInit(): void {
    this._service.getAll2().subscribe(it => {
      console.log(it);
    })
  }

  onAdd() {
    this._store.dispatch(campaignCreateActions.create());
  }
}
