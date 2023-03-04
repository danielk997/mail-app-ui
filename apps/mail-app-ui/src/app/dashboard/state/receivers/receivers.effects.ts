import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {receiversCreateActions, receiversLoadActions} from "./receivers.actions";
import {ReceiverControllerService} from "../../../shared/open-api/api/receiver-controller.service";
import {LoadCollectionActions, LoadEffectClass, LoadEffects} from "../../../shared/state/helpers/effects/load";
import {ServiceHandler} from "../../../shared/state/helpers/service-handler";
import {CreateEffects} from "../../../shared/state/helpers/effects/create";
import {ComponentType} from "@angular/cdk/overlay";
import {ReceiversFormComponent} from "../../containers/receivers-form/receivers-form.component";


export interface ReceiversEffects extends LoadEffectClass<any> {}

@LoadEffects({loadCollectionActions: receiversLoadActions})
@CreateEffects({createActions: receiversCreateActions})
@Injectable({
  providedIn: 'root',
})
export class ReceiversEffects {

  serviceHandler: ServiceHandler<any>;
  form: ComponentType<any> = ReceiversFormComponent;
  loadCollectionActions!: LoadCollectionActions<any>;

  constructor(
    public actions$: Actions,
    public service: ReceiverControllerService,
    public matDialog: MatDialog,
    public store: Store<any>
  ) {
    this.serviceHandler = new ServiceHandler(service, {
      getCollectionMethod: service.getAllReceivers,
      createMethod: service.add1
    })
  }
}

