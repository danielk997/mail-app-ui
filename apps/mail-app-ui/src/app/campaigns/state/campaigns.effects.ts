import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  campaignCreateActions,
  campaignSendActions,
  campaignsLoadActions,
  campaignUpdateActions
} from "./campaigns.actions";
import {CampaignControllerService, CampaignDTO} from "../../shared/open-api";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {of, tap} from "rxjs";
import {Router} from "@angular/router";
import {CampaignFormComponent} from "../containers/campaign-form/campaign-form.component";
import {FormBaseData, FormBaseType} from "../../shared/components/form-base/form-base.component";
import {defaultDataFormAdapter} from "../../shared/models/data-adapter";


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
    tap(it => this.matDialog.open<CampaignFormComponent, FormBaseData<CampaignDTO>>(CampaignFormComponent, {
      data: {
        formType: FormBaseType.CREATE,
      }
    }))
  ), {dispatch: false});

  createSubmitted$ = createEffect(() => this.actions$.pipe(
    ofType(campaignCreateActions.createSubmitted),
    switchMap(it => this.service.addCampaign(it.data).pipe(
      map(it => campaignCreateActions.createSuccess({data: it})),
      catchError(it => of(campaignCreateActions.createFailure({error: it})))
    )),
  ));

  loadDataToUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(campaignUpdateActions.loadDataToUpdate),
    switchMap(action => this.service.getAll2().pipe(
      map(it => it.find(x => x.id === action.id)),
      map(it => campaignUpdateActions.loadDataToUpdateSuccess({data: it!})),
      catchError(it => of(campaignUpdateActions.loadDataToUpdateFailure({error: it})))
    )),
  ));

  loadDataToUpdateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(campaignUpdateActions.loadDataToUpdateSuccess),
    tap(it => this.matDialog.open<CampaignFormComponent, FormBaseData<CampaignDTO>>(CampaignFormComponent, {
      data: {
        formType: FormBaseType.UPDATE,
        dto: {
          ...defaultDataFormAdapter(),
          data: it.data
        }
      }
    }))
  ), {dispatch: false});

  updateSubmitted$ = createEffect(() => this.actions$.pipe(
    ofType(campaignUpdateActions.updateSubmitted),
    switchMap(it => this.service.updateCampaign({...it.data, id: it.id}).pipe(
      map(it => campaignUpdateActions.updateSuccess({data: it})),
      catchError(error => of(campaignUpdateActions.updateFailure({error: error, data: it})))
    )),
  ));

  sendInit$ = createEffect(() => this.actions$.pipe(
    ofType(campaignSendActions.init),
    tap(it => this.router.navigate(['/campaigns/send'])),
  ), {dispatch: false})
}

