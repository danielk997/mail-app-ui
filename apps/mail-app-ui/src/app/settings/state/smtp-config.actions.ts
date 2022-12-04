import {SmtpConfigurationDTO} from "../../shared/open-api";
import {FeatureName, loadActions} from "../../shared/state/helpers/actions";

export const smtpConfigLoadActions = loadActions<SmtpConfigurationDTO>(FeatureName.SMTP_CONFIG);
