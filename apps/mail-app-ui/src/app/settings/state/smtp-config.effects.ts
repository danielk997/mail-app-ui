import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {smtpConfigLoadActions} from "./smtp-config.actions";
import {SmtpConfigurationControllerService} from "../../shared/open-api";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class SmtpConfigEffects {

  constructor(
    public actions$: Actions,
    public service: SmtpConfigurationControllerService,
    public matDialog: MatDialog,
    public store: Store<any>
  ) {
  }

  load$ = createEffect(() => this.actions$.pipe(
    ofType(smtpConfigLoadActions.load),
    switchMap(() => this.service.getAll1().pipe(
      map(it => smtpConfigLoadActions.loadSuccess({data: it})),
      catchError(it => of(smtpConfigLoadActions.loadFailure({error: it})))
    ))
  ))
}

