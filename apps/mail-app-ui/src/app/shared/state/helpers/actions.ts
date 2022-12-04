import {ActionCreatorProps, createActionGroup, props} from "@ngrx/store";
import {DataRequest} from "../../models/data-adapter";

export enum FeatureName {
  SMTP_CONFIG = 'Smtp Config',
}

export type ResponseError = string;

export const loadActions = <T>(featureName: FeatureName) => createActionGroup({
  source: featureName,
  events: {
    'Load': props<{ dataRequest?: DataRequest<any> }>(),
    'Load Success': props<{ data: T[] }>(),
    'Load Failure': props<{ error: ResponseError }>(),
  }
});

export const createActions = <T, P = {}>(featureName: FeatureName) => createActionGroup({
  source: featureName,
  events: {
    'Create': props<{ params?: P }>(),
    'Create Submitted': props<{ data: T, params?: any }>(),
    'Create Success': props<{ data: T }>(),
    'Create Failure': props<{ error: ResponseError }>(),
  }
});

export const updateActions = <T>(featureName: FeatureName) => createActionGroup({
  source: featureName,
  events: {
    'Load Data To Update': props<{ id: string, params?: any }>(),
    'Load Data To Update Success': props<{ data: T }>(),
    'Load Data To Update Failure': props<{ error: ResponseError }>(),
    'Update Submitted': props<{ id: string, data: T }>(),
    'Update Success': props<{ data: T }>(),
    'Update Failure': props<{ data: T, error: ResponseError }>(),
  }
});

export const deleteActions = <T>(featureName: FeatureName) => createActionGroup({
  source: featureName,
  events: {
    'Delete': props<{ id: string }>(),
    'Delete Submitted': props<{ id: string }>(),
    'Delete Success': props<{ id: string }>(),
    'Delete Failure': props<{ error: ResponseError }>(),
  }
});

export interface CommonActions<T, P = {}> {
  load: {
    'Load': ActionCreatorProps<{ dataRequest?: DataRequest<any> }>;
    'Load Success': ActionCreatorProps<{ data: T[] }>;
    'Load Failure': ActionCreatorProps<{ error: ResponseError }>;
  }
  create: {
    'Create': ActionCreatorProps<{ params?: P }>;
    'Create Submitted': ActionCreatorProps<{ data: T, params?: any }>;
    'Create Success': ActionCreatorProps<{ data: T }>;
    'Create Failure': ActionCreatorProps<{ error: ResponseError }>;
  },
  update: {
    'Load Data To Update': ActionCreatorProps<{ id: string, params?: P }>;
    'Load Data To Update Success': ActionCreatorProps<{ data: T }>;
    'Load Data To Update Failure': ActionCreatorProps<{ error: ResponseError }>;
    'Update Submitted': ActionCreatorProps<{ id: string, data: T }>;
    'Update Success': ActionCreatorProps<{ data: T }>;
    'Update Failure': ActionCreatorProps<{ data: T, error: ResponseError }>;
  },
  delete: {
    'Delete': ActionCreatorProps<{ id: string }>;
    'Delete Submitted': ActionCreatorProps<{ id: string }>;
    'Delete Success': ActionCreatorProps<{ id: string }>;
    'Delete Failure': ActionCreatorProps<{ error: ResponseError }>;
  }
}
