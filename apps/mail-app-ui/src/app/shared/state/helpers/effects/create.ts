import {CommonActions} from "../actions";
import {ActionGroup} from "@ngrx/store/src/action_group_creator_models";
import {Injectable} from "@angular/core";
import {createEffect, ofType} from "@ngrx/effects";
import {LoadCollectionActions, LoadEffectClass} from "./load";
import {exhaustMap, from, mergeMap, of, tap} from "rxjs";
import {notificationActions} from "../../../notifications/notification.actions";
import {catchError, map} from "rxjs/operators";
import {parseResponseErrors} from "../service-handler";
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {Store} from "@ngrx/store";
import {FormBaseType} from "../../../components/form-base/form-base.component";

export type ClassConstructor<T = Record<string, unknown>> = { new(...args: any[]): T };

export type CreateActions<T> = ActionGroup<string, CommonActions<T>['create']>;

export interface CreateEffectsOptions<T> {
  createActions: CreateActions<T>
}

export interface CreateEffectClass<T> extends LoadEffectClass<T> {

  form: ComponentType<any>;
  matDialog: MatDialog;
  store: Store;
  loadCollectionActions: LoadCollectionActions<T>;
}

export function CreateEffects<T>(options: CreateEffectsOptions<T>) {
  return function <C extends ClassConstructor<CreateEffectClass<T>>>(constructor: C) {

    @Injectable()
    class CreateEffectClass extends constructor {
      createActions: CreateActions<T> = options.createActions;

      create$ = createEffect(() => this.actions$.pipe(
        ofType(this.createActions.create),
        tap((action) =>
          this.matDialog.open(this.form, {
            data: {
              onClick: (value: any) => this.store.dispatch(this.createActions.createSubmitted({data: value})),
              type: FormBaseType.CREATE
            }
          })
        )
      ), {dispatch: false});

      createSubmitted$ = createEffect(() => this.actions$.pipe(
        ofType(this.createActions.createSubmitted),
        exhaustMap((action) =>
          this.serviceHandler.create(action.data).pipe(
            mergeMap((response) =>
              from([
                this.createActions.createSuccess({data: response}),
                notificationActions.success({
                  message: 'Create Success',
                }),
              ])
            ),
            catchError((error) => of(this.createActions.createFailure({
                error: parseResponseErrors(error)[0]
              })
            ))
          ))
      ));

      createSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(this.createActions.createSuccess),
        tap((action) => {
          this.matDialog.closeAll();
        }),
        map(() => this.loadCollectionActions.load({}))
      ));

      createFailure$ = createEffect(() => this.actions$.pipe(
        ofType(this.createActions.createFailure),
        map(({error}) => notificationActions.error({message: error}))
      ));
    }

    return CreateEffectClass;
  };
}
