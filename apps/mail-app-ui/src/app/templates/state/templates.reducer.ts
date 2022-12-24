import {createReducer} from '@ngrx/store';
import {TemplateDTO} from "../../shared/open-api";
import {DataAdapter, defaultDataAdapter} from "../../shared/models/data-adapter";
import {onLoad, onLoadFailure, onLoadSuccess} from "../../shared/state/helpers/reducers";
import {templatesLoadActions} from "./templates.actions";

export const templatesConfigFeatureKey = 'templates';

export interface State {
  list: DataAdapter<TemplateDTO>;
}

export const initialState: State = {
  list: defaultDataAdapter(),
};

export const templatesReducer = createReducer(
  initialState,

  onLoad(templatesLoadActions.load),
  onLoadSuccess(templatesLoadActions.loadSuccess),
  onLoadFailure(templatesLoadActions.loadFailure),
);
