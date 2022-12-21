import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {campaignCreateActions, campaignSendActions} from "./campaigns.actions";
import {tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class CampaignsEffects {

  constructor(
    private _actions$: Actions,
    private _matDialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  create$ = createEffect(() => this._actions$.pipe(
    ofType(campaignCreateActions.create),
    tap(it => this._router.navigate(['/campaigns/add'])),
  ), {dispatch: false});

  sendInit$ = createEffect(() => this._actions$.pipe(
    ofType(campaignSendActions.init),
    tap(it => this._router.navigate(['/campaigns/send'])),
  ), {dispatch: false})
}
