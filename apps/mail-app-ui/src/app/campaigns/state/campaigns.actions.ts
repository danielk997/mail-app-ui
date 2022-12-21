import {createActionGroup, emptyProps} from "@ngrx/store";


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
