import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {templatesCreateActions, templatesLoadActions, templatesUpdateActions} from "./templates.actions";
import {CampaignDTO, TemplateAddDTO, TemplateControllerService} from "../../shared/open-api";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {of, tap} from "rxjs";
import {FormBaseData, FormBaseType} from "../../shared/components/form-base/form-base.component";
import {defaultDataFormAdapter} from "../../shared/models/data-adapter";
import {TemplateFormComponent} from "../containers/template-form/template-form.component";


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
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(templatesCreateActions.create),
    tap(() => this.matDialog.open<TemplateFormComponent, FormBaseData<TemplateAddDTO>>(TemplateFormComponent, {
      width: '65vw',
      panelClass: 'position-relative',
      data: {
        formType: FormBaseType.CREATE
      }
    }))
  ), {dispatch: false});

  createSubmitted$ = createEffect(() => this.actions$.pipe(
    ofType(templatesCreateActions.createSubmitted),
    switchMap(it => this.service.addTemplate(it.data).pipe(
      map(it => templatesCreateActions.createSuccess({data: it})),
      catchError(it => of(templatesCreateActions.createFailure({error: it})))
    )),
  ));

  loadDataToUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(templatesUpdateActions.loadDataToUpdate),
    switchMap(action => this.service.getTemplates().pipe(
      map(it => it.find(x => x.id === action.id)),
      map(it => templatesUpdateActions.loadDataToUpdateSuccess({data: it!})),
      catchError(it => of(templatesUpdateActions.loadDataToUpdateFailure({error: it})))
    )),
  ));

  loadDataToUpdateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(templatesUpdateActions.loadDataToUpdateSuccess),
    tap(it => this.matDialog.open<TemplateFormComponent, FormBaseData<CampaignDTO>>(TemplateFormComponent, {
      width: '65vw',
      panelClass: 'position-relative',
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
    ofType(templatesUpdateActions.updateSubmitted),
    switchMap(it => this.service.updateTemplate({...it.data, id: it.id}).pipe(
      map(it => templatesUpdateActions.updateSuccess({data: it})),
      catchError(error => of(templatesUpdateActions.updateFailure({error: error, data: it})))
    )),
  ));
}

