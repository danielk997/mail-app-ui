import {createReducer, on} from '@ngrx/store';
import {CampaignDTO, SentCampaignDTO, StatsDTO} from "../../shared/open-api";
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
import {
  campaignSendActions,
  campaignsLoadActions,
  campaignStatsActions,
  campaignUpdateActions
} from "./campaigns.actions";

export const campaignsConfigFeatureKey = 'campaigns';

export interface State {
  list: DataAdapter<CampaignDTO>;
  dataToUpdate: DataFormAdapter<CampaignDTO>;
  sent: DataAdapter<SentCampaignDTO>;
  stats: StatsDTO;
}

export const initialState: State = {
  list: defaultDataAdapter(),
  dataToUpdate: defaultDataFormAdapter(),
  sent: defaultDataAdapter(),
  stats: {
    views: [],
    clicks: []
  },
};

export const campaignsReducer = createReducer(
  initialState,

  onLoad(campaignsLoadActions.load),
  onLoadSuccess(campaignsLoadActions.loadSuccess),
  onLoadFailure(campaignsLoadActions.loadFailure),

  onLoadDataToUpdate(campaignUpdateActions.loadDataToUpdate),
  onLoadDataToUpdateSuccess(campaignUpdateActions.loadDataToUpdateSuccess),
  onLoadDataToUpdateFailure(campaignUpdateActions.loadDataToUpdateFailure),

  on(campaignSendActions.loadsent, (state, action) => ({
    ...state,
    sent: {
      ...state.sent,
      pendingRequests: state.list.pendingRequests + 1
    },
  })),

  on(campaignSendActions.loadsentsuccess, (state, action) => ({
    ...state,
    sent: {
      ...state.sent,
      pendingRequests: state.list.pendingRequests - 1,
      data: action.data,
    },
  })),

  on(campaignSendActions.loadsentfailure, (state, action) => ({
    ...state,
    sent: {
      ...state.sent,
      pendingRequests: state.list.pendingRequests - 1,
    },
  })),

  on(campaignStatsActions.load, (state, action) => ({
    ...state,
    stats: {
      ...state.stats,
      pendingRequests: state.list.pendingRequests + 1
    },
  })),

  on(campaignStatsActions.loadsuccess, (state, action) => {
    console.log('ACTION', action.data.clicks);


    return ({
      ...state,
      stats: {
        ...state.stats,
        views: action.data.views,
        clicks: action.data.clicks,
      },
    })
  }),

  on(campaignStatsActions.loadfailure, (state, action) => ({
    ...state,
    stats: initialState.stats,
  })),
);
