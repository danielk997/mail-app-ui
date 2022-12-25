import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {notificationActions} from "../notifications/notification.actions";
import {campaignCreateActions, campaignUpdateActions} from "../../campaigns/state/campaigns.actions";
import {MatDialog} from "@angular/material/dialog";


@Injectable({
  providedIn: 'root',
})
export class SharedEffects {

  constructor(
    private _actions$: Actions,
    private _matDialog: MatDialog
  ) {
  }

  success$ = createEffect(() => this._actions$.pipe(
    ofType(
      campaignCreateActions.createSuccess,
      campaignUpdateActions.updateSuccess
    ),
    tap(() => this._matDialog.closeAll()),
    map((action) => notificationActions.success({message: this.getNotificationMessage(action.type)}))
  ));

  private getNotificationMessage(actionType: string) {
    return actionType.replace('[', '').replace(']', '');
  }
}

