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

// export function create$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.createActions!.create),
//     tap((action) => this.matDialog.open(this.component!, {
//       width: '880px',
//       maxHeight: '80vh',
//       autoFocus: false,
//       data: {
//         formType: FormBaseType.CREATE,
//         ...action.params
//       }
//     }))
//   ), {dispatch: false});
// }
//
// export function createSubmitted$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.createActions!.createSubmitted),
//     switchMap((action) => this.service.create!(action.data, action.params).pipe(
//       map(it => parseZabbixResponse(it)),
//       map(() => this.createActions!.createSuccess({data: action.data})),
//       catchError((error) => of(this.createActions!.createFailure({error: error})))
//     ))
//   ));
// }
//
//
// export function createSuccess$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//       ofType(this.createActions!.createSuccess),
//       withLatestFrom(this.store.select(this.dataSelector)),
//       mergeMap(([_action, state]) => from([
//         this.loadActions!.load({dataRequest: {params: state.params}}),
//         notificationActions.success({
//           message: `${this.featureName} added successfully`
//         }),
//       ])),
//       tap(() => this.matDialog.closeAll()),
//     )
//   );
// }
//
// export function loadDataToUpdate$<T, C>(this: EffectBase<T, C>, extras?: LoadEffectExtras<any>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.updateActions!.loadDataToUpdate),
//     tap((action) => this.matDialog.open<C, any>(this.component!, {
//       width: '860px',
//       maxHeight: '80vh',
//       autoFocus: false,
//       data: {
//         formType: FormBaseType.UPDATE,
//         id: action.id,
//         ...action.params
//       }
//     })),
//     switchMap((action) => forkJoin([
//       this.service.getById!(action.id),
//       ...extras?.extraData ?? []
//     ]).pipe(
//       map(it => parseZabbixResponse(...it)),
//       map(it => this.updateActions!.loadDataToUpdateSuccess({data: extras?.transform ? extras?.transform(it.result!, it.extras)[0] : it.result![0]})),
//       catchError((error: ResponseError) => of(this.updateActions!.loadDataToUpdateFailure({error: error})))
//     ))
//   ));
// }
//
// export function updateSubmitted$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.updateActions!.updateSubmitted),
//     switchMap(action => this.service.update!(action.id, action.data).pipe(
//       map(it => parseZabbixResponse(it)),
//       map(() => this.updateActions!.updateSuccess({data: action.data})),
//       catchError(error => of(this.updateActions!.updateFailure({error: error, data: action.data})))
//     ))
//   ));
// }
//
// export function updateSuccess$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.updateActions!.updateSuccess),
//     tap(() => this.matDialog.closeAll()),
//     withLatestFrom(this.store.select(this.dataSelector)),
//     switchMap(([_action, state]) => from([
//       this.loadActions!.load({dataRequest: {params: state.params}}),
//       notificationActions.success({message: `${this.featureName} update success`}),
//     ]))
//   ));
// }
//
// export function delete$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.deleteActions!.delete),
//     tap(({id}) => this.matDialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
//       data: {
//         onClick: () => this.store.dispatch(this.deleteActions!.deleteSubmitted({id: id})),
//         message: this.featureName,
//         type: ConfirmDialogType.DELETE
//       }
//     }))
//   ), {dispatch: false});
// }
//
// export function deleteSubmitted$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.deleteActions!.deleteSubmitted),
//     switchMap(({id}) => this.service.delete!(id).pipe(
//       map((it) => parseZabbixResponse(it)),
//       map(() => this.deleteActions!.deleteSuccess({id})),
//       catchError((error) => of(this.deleteActions!.deleteFailure({error: error})))
//     ))
//   ));
// }
//
// export function deleteSuccess$<T, C>(this: EffectBase<T, C>) {
//   return createEffect(() => this.actions$.pipe(
//     ofType(this.deleteActions!.deleteSuccess),
//     tap(() => this.matDialog.closeAll()),
//     withLatestFrom(this.store.select(this.dataSelector)),
//     switchMap(([_action, state]) => from([
//       this.loadActions!.load({dataRequest: {params: state.params}}),
//       notificationActions.success({message: `${this.featureName} has been deleted`}),
//     ]))
//   ));
// }
