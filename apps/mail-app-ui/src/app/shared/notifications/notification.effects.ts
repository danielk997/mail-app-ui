import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {NotifierService} from "angular-notifier";
import {tap} from "rxjs/operators";
import {notificationActions} from "./notification.actions";


@Injectable()
export class NotificationEffects {

  constructor(private actions$: Actions, private notifierService: NotifierService) {
  }

  errorNotification$ = createEffect(() => this.actions$.pipe(
      ofType(notificationActions.error),
      tap(({message}) => this.notifierService.notify('error', message))
    ), {dispatch: false}
  );

  successNotification$ = createEffect(() => this.actions$.pipe(
      ofType(notificationActions.success),
    tap(({message}) => this.notifierService.notify('success', message))
    ), {dispatch: false}
  );
}
