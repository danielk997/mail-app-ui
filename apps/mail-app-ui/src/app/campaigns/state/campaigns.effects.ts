import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {x123} from "./campaigns.actions";
import {tap} from "rxjs";

@Injectable({providedIn: "root"})
export class CampaignsEffects {

  constructor(
    private _actions$: Actions
  ) {
  }

  test$ = createEffect(() => this._actions$.pipe(
    ofType(x123),
    tap(it => console.log('WORKS', it)),
  ), {dispatch: false})
}
