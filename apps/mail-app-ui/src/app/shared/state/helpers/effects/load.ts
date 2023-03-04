import {CommonActions} from "../actions";
import {ActionGroup} from "@ngrx/store/src/action_group_creator_models";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {parseResponseErrors, ServiceHandler} from "../service-handler";
import {ClassConstructor} from "./create";
import {Injectable} from "@angular/core";
import {catchError, concatMap, map} from "rxjs/operators";
import {from, tap} from "rxjs";
import {notificationActions} from "../../../notifications/notification.actions";

export type LoadCollectionActions<T> = ActionGroup<string, CommonActions<T>['load']>;

export interface LoadEffectsOptions<T> {
  loadCollectionActions: LoadCollectionActions<T>;
}

export interface LoadEffectClass<T> {
  actions$: Actions;
  serviceHandler: ServiceHandler<T>;
}

export function LoadEffects<T>(options: LoadEffectsOptions<T>) {
  return function <C extends ClassConstructor<LoadEffectClass<T>>>(constructor: C) {

    @Injectable()
    class LoadEffectClass extends constructor {
      loadCollectionActions: LoadCollectionActions<T> = options.loadCollectionActions;

      loadCollection$ = createEffect(() => this.actions$.pipe(
        ofType(this.loadCollectionActions.load),
        concatMap((action) => this.serviceHandler.getCollection().pipe(
            map(response => this.loadCollectionActions.loadSuccess({
              data: response ?? []
            })),
            catchError((error) => from([
              this.loadCollectionActions.loadFailure({
                error: error
              }),
              notificationActions.error({
                message: parseResponseErrors(error)[0],
              }),
            ]))
          )
        )));
    }

    return LoadEffectClass;
  };
}
