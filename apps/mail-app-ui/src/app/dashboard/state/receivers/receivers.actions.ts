import {PersonDTO} from "../../../shared/open-api";
import {createActions, FeatureName, loadActions} from "../../../shared/state/helpers/actions";

export const receiversLoadActions = loadActions<PersonDTO>(FeatureName.RECEIVERS);
export const receiversCreateActions = createActions<PersonDTO>(FeatureName.RECEIVERS);
