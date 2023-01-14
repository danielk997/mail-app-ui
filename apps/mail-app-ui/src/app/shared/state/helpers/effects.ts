import {Actions, createEffect, ofType} from "@ngrx/effects";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, concatMap, map, tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ActionGroup} from "@ngrx/store/src/action_group_creator_models";
import {ComponentType} from "@angular/cdk/overlay";
import {MemoizedSelector, Store} from "@ngrx/store";
import {CommonActions, FeatureName} from "./actions";
import {HttpContext} from "@angular/common/http";

export interface CommonService<T> {
  get(): CanLoad<T>;
}

export type CanLoad<T> = {
  [p: string]: (observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*', context?: HttpContext}) => any
};


export interface ServiceConfig<S extends CanLoad<T>, T> {
  service: S;
  getAllMethodName: keyof S;
}

export interface EffectBase<T, C, S extends CanLoad<T>> {
  featureName: FeatureName;
  dataSelector: MemoizedSelector<any, any>;
  actions$: Actions;
  matDialog: MatDialog;
  store: Store<any>;
  service: ServiceConfig<S, T>;
  getAllMethod: (params?: any) => Observable<T[]>;
  loadActions?: ActionGroup<string, CommonActions<T>['load']>;
  createActions?: ActionGroup<string, CommonActions<T>['create']>;
  updateActions?: ActionGroup<string, CommonActions<T>['update']>;
  deleteActions?: ActionGroup<string, CommonActions<T>['delete']>;
  component?: ComponentType<C>;
}

export interface LoadEffectExtras<T> {
  transform?: (data: T[], extras?: any) => any;
  extraData?: Observable<any>[];
}

export function load$<T, C, S extends CanLoad<T>>(this: EffectBase<T, C, S>, extras?: LoadEffectExtras<any>) {
  return createEffect(() => this.actions$.pipe(
    tap(() => console.log('load')),
    ofType(this.loadActions!.load),

    concatMap(action => forkJoin([
      this.service.service[this.service.getAllMethodName](action.dataRequest?.params),
      ...extras?.extraData ?? []
    ]).pipe(
      map(it => this.loadActions!.loadSuccess({data: it})),
      catchError((error) => of(this.loadActions!.loadFailure({error: error})))
    ))
  ))
}
