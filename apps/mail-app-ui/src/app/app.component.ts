import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'mail-app-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;

  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    private _notifierService: NotifierService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
  ) {
  }

  ngOnInit() {
    this.configureNotifier();
  }

  private configureNotifier() {
    this._notifierService.getConfig().position = {
      horizontal: {
        position: 'right',
        distance: 10
      },
      vertical: {
        position: 'top',
        distance: 10,
        gap: 10
      }
    }
  }
}
