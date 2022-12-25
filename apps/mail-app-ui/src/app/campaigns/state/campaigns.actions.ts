import {CampaignDTO} from "../../shared/open-api";
import {FeatureName, loadActions} from "../../shared/state/helpers/actions";
import {createActionGroup, emptyProps} from "@ngrx/store";

export const campaignsLoadActions = loadActions<CampaignDTO>(FeatureName.CAMPAIGNS);

export const campaignCreateActions = createActionGroup({
  source: 'Campaign',
  events: {
    create: emptyProps()
  }
});

export const campaignSendActions = createActionGroup({
  source: 'Campaign',
  events: {
    init: emptyProps()
  }
});
