import {createReducer} from '@ngrx/store';
import {TemplateDTO} from "../../shared/open-api";
import {
  DataAdapter,
  DataFormAdapter,
  defaultDataAdapter,
  defaultDataFormAdapter
} from "../../shared/models/data-adapter";
import {
  onLoad,
  onLoadDataToUpdate,
  onLoadDataToUpdateFailure,
  onLoadDataToUpdateSuccess,
  onLoadFailure,
  onLoadSuccess
} from "../../shared/state/helpers/reducers";
import {templatesLoadActions, templatesUpdateActions} from "./templates.actions";

export const templatesConfigFeatureKey = 'templates';

export interface State {
  list: DataAdapter<TemplateDTO>;
  dataToUpdate: DataFormAdapter<TemplateDTO>;
}

export const initialState: State = {
  list: defaultDataAdapter(),
  dataToUpdate: defaultDataFormAdapter()
};

export const templatesReducer = createReducer(
  initialState,

  onLoad(templatesLoadActions.load),
  onLoadSuccess(templatesLoadActions.loadSuccess),
  onLoadFailure(templatesLoadActions.loadFailure),

  onLoadDataToUpdate(templatesUpdateActions.loadDataToUpdate),
  onLoadDataToUpdateSuccess(templatesUpdateActions.loadDataToUpdateSuccess),
  onLoadDataToUpdateFailure(templatesUpdateActions.loadDataToUpdateFailure),
);
