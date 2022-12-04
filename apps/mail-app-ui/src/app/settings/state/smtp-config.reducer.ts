import {createReducer} from '@ngrx/store';
import {SmtpConfigurationDTO} from "../../shared/open-api";
import {DataAdapter, defaultDataAdapter} from "../../shared/models/data-adapter";
import {onLoad, onLoadFailure, onLoadSuccess} from "../../shared/state/helpers/reducers";
import {smtpConfigLoadActions} from "./smtp-config.actions";

export const smtpConfigFeatureKey = 'smtpConfig';

export interface State {
  list: DataAdapter<SmtpConfigurationDTO>;
}

export const initialState: State = {
  list: defaultDataAdapter(),
};

export const smtpConfigReducer = createReducer(
  initialState,

  onLoad(smtpConfigLoadActions.load),
  onLoadSuccess(smtpConfigLoadActions.loadSuccess),
  onLoadFailure(smtpConfigLoadActions.loadFailure),
);
