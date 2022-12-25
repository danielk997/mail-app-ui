import {CampaignAddDTO, CampaignDTO} from "../../shared/open-api";
import {createActions, FeatureName, loadActions, updateActions} from "../../shared/state/helpers/actions";
import {createActionGroup, emptyProps} from "@ngrx/store";

export const campaignsLoadActions = loadActions<CampaignDTO>(FeatureName.CAMPAIGNS);
export const campaignCreateActions = createActions<CampaignAddDTO>(FeatureName.CAMPAIGNS);
export const campaignUpdateActions = updateActions<CampaignDTO, number>(FeatureName.CAMPAIGNS);

export const campaignSendActions = createActionGroup({
  source: 'Campaign',
  events: {
    init: emptyProps()
  }
});
