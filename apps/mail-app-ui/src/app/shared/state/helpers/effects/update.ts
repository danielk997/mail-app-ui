import {CommonActions} from "../actions";
import {ActionGroup} from "@ngrx/store/src/action_group_creator_models";
import {Injectable} from "@angular/core";
import {createEffect, ofType} from "@ngrx/effects";
import {LoadCollectionActions, LoadEffectClass} from "./load";
import {from, Observable, of, switchMap, tap} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {parseResponseErrors} from "../service-handler";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {MemoizedSelector, Store} from "@ngrx/store";
import {FormBaseType} from "../../../components/form-base/form-base.component";
import {notificationActions} from "../../../notifications/notification.actions";

export type ClassConstructor<T = Record<string, unknown>> = { new(...args: any[]): T };

export type UpdateActions<T> = ActionGroup<string, CommonActions<T>['update']>;

export interface UpdateEffectsOptions<T> {
  updateActions: UpdateActions<T>
}

export interface UpdateEffectClass<T> extends LoadEffectClass<T> {

  form: ComponentType<any>;
  matDialog: MatDialog;
  store: Store;
  loadCollectionActions: LoadCollectionActions<T>;
  dataToUpdate$: Observable<any>;

}

export function UpdateEffects<T>(options: UpdateEffectsOptions<T>) {
  return function <C extends ClassConstructor<UpdateEffectClass<T>>>(constructor: C) {

    @Injectable()
    class UpdateEffectClass extends constructor {
      updateActions: UpdateActions<T> = options.updateActions;

      loadDataToUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(this.updateActions.loadDataToUpdate),
        tap((action) =>
          this.matDialog.open(this.form, {
            data: {
              onClick: (value: any) => this.store.dispatch(this.updateActions.updateSubmitted({
                data: value,
                id: action.id
              })),
              type: FormBaseType.UPDATE,
              dataToUpdate$: this.dataToUpdate$
            }
          })
        ),
        switchMap((action) => this.serviceHandler.getSingle(action.id).pipe(
          map(it => this.updateActions.loadDataToUpdateSuccess({data: it})),
          catchError(error => of(this.updateActions.loadDataToUpdateFailure({error: parseResponseErrors(error)[0]})))
        ))
      ));

      updateSubmitted$ = createEffect(() => this.actions$.pipe(
        ofType(this.updateActions.updateSubmitted),
        switchMap((action) => this.serviceHandler.update(action.id, action.data).pipe(
          map(it => this.updateActions.updateSuccess({data: it})),
          catchError(error => of(this.updateActions.updateFailure({error: parseResponseErrors(error)[0]})))
        ))
      ));

      updateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(this.updateActions.updateSuccess),
        tap(() => this.matDialog.closeAll()),
        switchMap(() => from([
          this.loadCollectionActions.load({}),
          notificationActions.success({message: 'Update success'})
        ]))
      ))
    }

    return UpdateEffectClass;
  };
}
