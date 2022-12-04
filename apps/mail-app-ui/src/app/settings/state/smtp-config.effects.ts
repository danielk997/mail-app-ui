import {Injectable} from '@angular/core';
import {Actions, createEffect, CreateEffectMetadata, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {smtpConfigLoadActions} from "./smtp-config.actions";
import {SmtpConfigurationControllerService} from "../../shared/open-api";
import {Store} from "@ngrx/store";
import {EffectBase, load$} from "../../shared/state/helpers/effects";
import {MatDialog} from "@angular/material/dialog";
import {SmtpFormComponent} from "../containers/smtp-form/smtp-form.component";
import {ActionGroup} from "@ngrx/store/src/action_group_creator_models";
import {CommonActions, FeatureName} from "../../shared/state/helpers/actions";
import {selectSmtpConfigList} from "./smtp-config.selectors";
import {notificationActions} from "../../shared/notifications/notification.actions";


@Injectable({
  providedIn: 'root',
})
export class SmtpConfigEffects implements EffectBase<any, SmtpFormComponent> {

  featureName = FeatureName.SMTP_CONFIG;
  dataSelector = selectSmtpConfigList;

  loadActions: ActionGroup<string, CommonActions<any>['load']>;

  loadWebScenarios$: CreateEffectMetadata;

  component = SmtpFormComponent;

  constructor(
    public actions$: Actions,
    public service: SmtpConfigurationControllerService,
    public matDialog: MatDialog,
    public store: Store<any>
  ) {
    this.loadActions = smtpConfigLoadActions as any;

    this.loadWebScenarios$ = load$.call(this);
  }

  failure$ = createEffect(() => this.actions$.pipe(
    ofType(

    ),
    map((action) => notificationActions.error({message: 'Error occured'}))
  ));
}
