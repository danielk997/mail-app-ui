import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromReceivers from './receivers.reducer';

export const selectReceiversState = createFeatureSelector<fromReceivers.State>(
  fromReceivers.receiversFeatureKey
);

export const selectReceiversList = createSelector(selectReceiversState, state => state.list);


