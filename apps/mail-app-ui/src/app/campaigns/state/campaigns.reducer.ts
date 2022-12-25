import {createReducer} from '@ngrx/store';
import {CampaignDTO} from "../../shared/open-api";
import {DataAdapter, defaultDataAdapter} from "../../shared/models/data-adapter";
import {onLoad, onLoadFailure, onLoadSuccess} from "../../shared/state/helpers/reducers";
import {campaignsLoadActions} from "./campaigns.actions";

export const campaignsConfigFeatureKey = 'campaigns';

export interface State {
  list: DataAdapter<CampaignDTO>;
}

export const initialState: State = {
  list: defaultDataAdapter(),
};

export const campaignsReducer = createReducer(
  initialState,

  onLoad(campaignsLoadActions.load),
  onLoadSuccess(campaignsLoadActions.loadSuccess),
  onLoadFailure(campaignsLoadActions.loadFailure),
);
