import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTemplates from './templates.reducer';

export const selectTemplateState = createFeatureSelector<fromTemplates.State>(
  fromTemplates.templatesConfigFeatureKey
);

export const selectTemplatesList = createSelector(selectTemplateState, state => state.list);


