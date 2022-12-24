import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {templatesLoadActions} from "./templates.actions";
import {TemplateControllerService} from "../../shared/open-api";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class TemplatesEffects {

  constructor(
    public actions$: Actions,
    public service: TemplateControllerService,
    public matDialog: MatDialog,
    public store: Store<any>
  ) {
  }

  load$ = createEffect(() => this.actions$.pipe(
    ofType(templatesLoadActions.load),
    switchMap(() => this.service.getTemplates().pipe(
      map(it => templatesLoadActions.loadSuccess({data: it})),
      catchError(it => of(templatesLoadActions.loadFailure({error: it})))
    ))
  ))
}

