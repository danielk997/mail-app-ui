import {createReducer} from '@ngrx/store';
import {PersonDTO} from "../../../shared/open-api";
import {DataAdapter, defaultDataAdapter} from "../../../shared/models/data-adapter";
import {onLoad, onLoadFailure, onLoadSuccess} from "../../../shared/state/helpers/reducers";
import {receiversLoadActions} from "./receivers.actions";

export const receiversFeatureKey = 'receivers';

export interface State {
  list: DataAdapter<PersonDTO>;
}

export const initialState: State = {
  list: defaultDataAdapter(),
};

export const receiversReducer = createReducer(
  initialState,

  onLoad(receiversLoadActions.load),
  onLoadSuccess(receiversLoadActions.loadSuccess),
  onLoadFailure(receiversLoadActions.loadFailure),
);
