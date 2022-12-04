import {on, ReducerTypes} from "@ngrx/store";
import {DataAdapter, DataFormAdapter} from "../../models/data-adapter";

export interface HasList<T> {
  list: DataAdapter<T>;
}

export interface HasDataToUpdate<T> {
  dataToUpdate: DataFormAdapter<T>;
}

export const onLoad = <S extends HasList<T>, T>(creator: any): ReducerTypes<S, typeof creator> =>
  on(creator, (state, action) => ({
    ...state,
    list: {
      ...state.list,
      params: action.dataRequest?.params,
      pendingRequests: state.list.pendingRequests + 1
    },
  }));

export const onLoadSuccess = <S extends HasList<T>, T>(creator: any): ReducerTypes<S, typeof creator> =>
  on(creator, (state, action) => ({
    ...state,
    list: {
      ...state.list,
      data: action.data,
      pendingRequests: state.list.pendingRequests - 1
    },
  }));

export const onLoadFailure = <S extends HasList<T>, T>(creator: any): ReducerTypes<S, typeof creator> =>
  on(creator, (state) => ({
    ...state,
    list: {
      ...state.list,
      pendingRequests: state.list.pendingRequests - 1
    },
  }));


export const onLoadDataToUpdate = <S extends HasDataToUpdate<T>, T>(creator: any): ReducerTypes<S, typeof creator> =>
  on(creator, (state) => ({
    ...state,
    dataToUpdate: {
      ...state.dataToUpdate,
      pendingRequests: state.dataToUpdate.pendingRequests + 1
    },
  }));

export const onLoadDataToUpdateSuccess = <S extends HasDataToUpdate<T>, T>(creator: any): ReducerTypes<S, typeof creator> =>
  on(creator, (state, action) => ({
    ...state,
    dataToUpdate: {
      ...state.dataToUpdate,
      data: action.data,
      pendingRequests: state.dataToUpdate.pendingRequests - 1
    },
  }));

export const onLoadDataToUpdateFailure = <S extends HasDataToUpdate<T>, T>(creator: any): ReducerTypes<S, typeof creator> =>
  on(creator, (state) => ({
    ...state,
    dataToUpdate: {
      ...state.dataToUpdate,
      data: undefined,
      pendingRequests: state.dataToUpdate.pendingRequests - 1
    },
  }));
