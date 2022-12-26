import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCampaigns from './campaigns.reducer';

export const selectCampaignsState = createFeatureSelector<fromCampaigns.State>(
  fromCampaigns.campaignsConfigFeatureKey
);

export const selectCampaignsList = createSelector(selectCampaignsState, state => state.list);

export const selectCampaignToUpdate = createSelector(selectCampaignsState, state => state.dataToUpdate);

export const selectSentCampaignsList = createSelector(selectCampaignsState, state => state.sent);

export const selectCampaignsViewsList = createSelector(selectCampaignsState, state => state.stats.views);

export const selectCampaignsClicksList = createSelector(selectCampaignsState, state => state.stats.clicks);


