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
import { ApplicationContextClassLoaderParentUnnamedModule } from './application-context-class-loader-parent-unnamed-module';
import { ApplicationContextClassLoaderParentUnnamedModuleClassLoaderDefinedPackages } from './application-context-class-loader-parent-unnamed-module-class-loader-defined-packages';
import { ApplicationContextClassLoaderParent } from './application-context-class-loader-parent';


export interface ApplicationContextClassLoader { 
    name?: string;
    registeredAsParallelCapable?: boolean;
    parent?: ApplicationContextClassLoaderParent;
    unnamedModule?: ApplicationContextClassLoaderParentUnnamedModule;
    definedPackages?: Array<ApplicationContextClassLoaderParentUnnamedModuleClassLoaderDefinedPackages>;
    defaultAssertionStatus?: boolean;
}

