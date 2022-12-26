import {TemplateAddDTO, TemplateDTO} from "../../shared/open-api";
import {createActions, FeatureName, loadActions, updateActions} from "../../shared/state/helpers/actions";

export const templatesLoadActions = loadActions<TemplateDTO>(FeatureName.TEMPLATES);
export const templatesCreateActions = createActions<TemplateAddDTO>(FeatureName.TEMPLATES);
export const templatesUpdateActions = updateActions<TemplateDTO, number>(FeatureName.TEMPLATES);
