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
import { ApplicationContextClassLoader } from './application-context-class-loader';
import { Environment } from './environment';


export interface ApplicationContext { 
    parent?: ApplicationContext;
    id?: string;
    displayName?: string;
    applicationName?: string;
    startupDate?: number;
    autowireCapableBeanFactory?: object;
    environment?: Environment;
    beanDefinitionCount?: number;
    beanDefinitionNames?: Array<string>;
    parentBeanFactory?: object;
    classLoader?: ApplicationContextClassLoader;
}

