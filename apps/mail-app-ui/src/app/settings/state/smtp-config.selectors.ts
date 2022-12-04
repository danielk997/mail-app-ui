import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSmtpConfig from './smtp-config.reducer';

export const selectTemplateState = createFeatureSelector<fromSmtpConfig.State>(
  fromSmtpConfig.smtpConfigFeatureKey
);

export const selectSmtpConfigList = createSelector(selectTemplateState, state => state.list);


