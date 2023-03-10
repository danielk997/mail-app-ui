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
import { Group } from './group';
import { Campaign } from './campaign';
import { Template } from './template';


export interface SentCampaign { 
    id?: string;
    date: string;
    status: string;
    sender: string;
    title: string;
    parent: Campaign;
    template: Template;
    group: Group;
}

