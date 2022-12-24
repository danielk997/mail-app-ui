import {SmtpConfigurationDTO} from "../../shared/open-api";
import {FeatureName, loadActions} from "../../shared/state/helpers/actions";

export const templatesLoadActions = loadActions<SmtpConfigurationDTO>(FeatureName.TEMPLATES);
