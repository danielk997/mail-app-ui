import {createAction, createActionGroup, emptyProps} from "@ngrx/store";

export const x123 = createAction('x12345');

export const campaignCreateActions = createActionGroup({
  source: 'Campaign',
  events: {
    create: emptyProps()
  }
})
