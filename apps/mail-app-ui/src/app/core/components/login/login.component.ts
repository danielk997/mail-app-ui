import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";

@Component({
  selector: 'mail-app-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router,
              private _oktaStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {

  }

  ngOnInit(): void {
  }

  public async signIn(): Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      () => this._router.navigate(['/'])
    );
  }
}
