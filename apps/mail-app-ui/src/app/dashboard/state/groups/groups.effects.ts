import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {GroupControllerService} from "../../../shared/open-api";
import {ServiceHandler} from "../../../shared/state/helpers/service-handler";
import {ComponentType} from "@angular/cdk/overlay";
import {LoadCollectionActions, LoadEffects} from "../../../shared/state/helpers/effects/load";
import {groupsCreateActions, groupsLoadActions, groupsUpdateActions} from "./groups.actions";
import {UpdateEffects} from "../../../shared/state/helpers/effects/update";
import {GroupsFormComponent} from "../../containers/groups-form/groups-form.component";
import {selectGroupToUpdate} from "./groups.selectors";
import {Observable} from "rxjs";
import {CreateEffects} from "../../../shared/state/helpers/effects/create";


@LoadEffects({loadCollectionActions: groupsLoadActions})
@CreateEffects({createActions: groupsCreateActions})
@UpdateEffects({updateActions: groupsUpdateActions})
@Injectable({
  providedIn: 'root',
})
export class GroupsEffects {

  serviceHandler: ServiceHandler<any>;
  form: ComponentType<any> = GroupsFormComponent;
  loadCollectionActions!: LoadCollectionActions<any>;

  dataToUpdate$!: Observable<any>;

  constructor(
    public actions$: Actions,
    public service: GroupControllerService,
    public matDialog: MatDialog,
    public store: Store<any>
  ) {
    this.dataToUpdate$ = store.select(selectGroupToUpdate);
    this.serviceHandler = new ServiceHandler(service, {
      getCollectionMethod: service.getAllGroups,
      getSingleMethod: service.getGroup,
      createMethod: service.add2,
    })
  }
}

