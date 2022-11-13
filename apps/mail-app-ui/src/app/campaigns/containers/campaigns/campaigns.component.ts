import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {x123} from "../../state/campaigns.actions";

@Component({
  selector: 'mail-app-ui-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {

  constructor(
    private _store: Store
  ) {
  }

  ngOnInit(): void {
  }

  onClick() {
    this._store.dispatch(x123());
  }
}
