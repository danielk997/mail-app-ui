export * from './campaign-controller.service';
import { CampaignControllerService } from './campaign-controller.service';
export * from './sent-campaign-controller.service';
import { SentCampaignControllerService } from './sent-campaign-controller.service';
export * from './smtp-configuration-controller.service';
import { SmtpConfigurationControllerService } from './smtp-configuration-controller.service';
export * from './view-controller.service';
import { ViewControllerService } from './view-controller.service';
export const APIS = [CampaignControllerService, SentCampaignControllerService, SmtpConfigurationControllerService, ViewControllerService];
