import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {campaignCreateActions, campaignSendActions, campaignsLoadActions} from "./campaigns.actions";
import {CampaignControllerService, TemplateControllerService} from "../../shared/open-api";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {of, tap} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class CampaignsEffects {

  constructor(
    public actions$: Actions,
    public service: CampaignControllerService,
    public matDialog: MatDialog,
    public store: Store<any>,
    public router: Router
  ) {
  }

  load$ = createEffect(() => this.actions$.pipe(
    ofType(campaignsLoadActions.load),
    switchMap(() => this.service.getAll2().pipe(
      map(it => campaignsLoadActions.loadSuccess({data: it})),
      catchError(it => of(campaignsLoadActions.loadFailure({error: it})))
    ))
  ))

  create$ = createEffect(() => this.actions$.pipe(
    ofType(campaignCreateActions.create),
    tap(it => this.router.navigate(['/campaigns/add'])),
  ), {dispatch: false});

  sendInit$ = createEffect(() => this.actions$.pipe(
    ofType(campaignSendActions.init),
    tap(it => this.router.navigate(['/campaigns/send'])),
  ), {dispatch: false})
}

