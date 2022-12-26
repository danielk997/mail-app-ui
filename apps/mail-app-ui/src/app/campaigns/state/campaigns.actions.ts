import {CampaignAddDTO, CampaignDTO, SentCampaignDTO, StatsDTO} from "../../shared/open-api";
import {createActions, FeatureName, loadActions, updateActions} from "../../shared/state/helpers/actions";
import {createActionGroup, emptyProps, props} from "@ngrx/store";

export const campaignsLoadActions = loadActions<CampaignDTO>(FeatureName.CAMPAIGNS);
export const campaignCreateActions = createActions<CampaignAddDTO>(FeatureName.CAMPAIGNS);
export const campaignUpdateActions = updateActions<CampaignDTO, number>(FeatureName.CAMPAIGNS);

export const campaignSendActions = createActionGroup({
  source: 'Campaign',
  events: {
    init: emptyProps(),
    loadSent: props<{id: number}>(),
    loadSentSuccess: props<{data: SentCampaignDTO[], id: number}>(),
    loadSentFailure: props<{error: string}>(),
  }
});

export const campaignStatsActions = createActionGroup({
  source: 'Campaign',
  events: {
    load: props<{ id: string }>(),
    loadSuccess: props<{ data: StatsDTO, id: string }>(),
    loadFailure: props<{ error: string }>(),
  }
});
