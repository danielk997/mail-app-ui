import {createReducer} from '@ngrx/store';
import {GroupDTO} from "../../../shared/open-api";
import {
  DataAdapter,
  DataFormAdapter,
  defaultDataAdapter,
  defaultDataFormAdapter
} from "../../../shared/models/data-adapter";
import {
  onLoad,
  onLoadDataToUpdate,
  onLoadDataToUpdateFailure,
  onLoadDataToUpdateSuccess,
  onLoadFailure,
  onLoadSuccess
} from "../../../shared/state/helpers/reducers";
import {groupsLoadActions, groupsUpdateActions} from "./groups.actions";

export const groupsFeatureKey = 'groups';

export interface State {
  list: DataAdapter<GroupDTO>;
  dataToUpdate: DataFormAdapter<any>;
}

export const initialState: State = {
  list: defaultDataAdapter(),
  dataToUpdate: defaultDataFormAdapter(),
};

export const groupsReducer = createReducer(
  initialState,

  onLoad(groupsLoadActions.load),
  onLoadSuccess(groupsLoadActions.loadSuccess),
  onLoadFailure(groupsLoadActions.loadFailure),

  onLoadDataToUpdate(groupsUpdateActions.loadDataToUpdate),
  onLoadDataToUpdateSuccess(groupsUpdateActions.loadDataToUpdateSuccess),
  onLoadDataToUpdateFailure(groupsUpdateActions.loadDataToUpdateFailure),
);
