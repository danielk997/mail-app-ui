import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCampaigns from './campaigns.reducer';

export const selectCampaignsState = createFeatureSelector<fromCampaigns.State>(
  fromCampaigns.campaignsConfigFeatureKey
);

export const selectCampaignsList = createSelector(selectCampaignsState, state => state.list);


