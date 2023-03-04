import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromGroups from './groups.reducer';

export const selectGroupState = createFeatureSelector<fromGroups.State>(
  fromGroups.groupsFeatureKey
);

export const selectGroupsList = createSelector(selectGroupState, state => state.list);

export const selectGroupToUpdate = createSelector(selectGroupState, state => state.dataToUpdate);


