/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CampaignDTO } from './campaign-dto';
import { TemplateDTO } from './template-dto';
import { GroupDTO } from './group-dto';


export interface SentCampaignDTO { 
    id?: string;
    date?: string;
    parent?: CampaignDTO;
    template?: TemplateDTO;
    group?: GroupDTO;
    status?: string;
    sender?: string;
    title?: string;
}

