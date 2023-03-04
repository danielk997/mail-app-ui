import {GroupDTO} from "../../../shared/open-api";
import {createActions, FeatureName, loadActions, updateActions} from "../../../shared/state/helpers/actions";

export const groupsLoadActions = loadActions<GroupDTO>(FeatureName.GROUPS);
export const groupsCreateActions = createActions<GroupDTO>(FeatureName.GROUPS);
export const groupsUpdateActions = updateActions<GroupDTO>(FeatureName.GROUPS);
