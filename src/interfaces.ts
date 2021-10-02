import * as Joi from 'joi';
import { RequestHandler } from 'express';
import {
  ComponentsObject,
  ExternalDocumentationObject,
  InfoObject,
  PathsObject,
  SecurityRequirementObject,
  ServerObject,
  TagObject,
} from 'openapi3-ts';

import { HttpMethod } from './constants';

export interface IRouteResult {
  get: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  post: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  put: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  patch: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  delete: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  template: (template: ITemplateRoute, ...args: RequestHandler[]) => IRouteResult;
}

export interface ISwaggerDefinition {
  openapi: string;
  info: InfoObject;
  servers?: ServerObject[];
  paths: PathsObject;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}

// Default options passed along when initiating Swagger in project
export interface ISwaggerOptions {
  title?: string;
  description?: string;
  servers?: ServerObject[];
  apiVersion?: '3.0';
  version?: string;
  auth?: 'basic';
  termsOfService?: string;
}

export interface IInput {
  body?: ISchema;
  query?: ISchema | object;
  params?: ISchema | object;
}

export type IOutput = {
  [key: number]: ISchema | { [key: string]: ISchema };
};

export interface IDocsOptions {
  input?: IInput;
  output?: IOutput;
  schemaOptions?: object;
  tags?: string[];
  description?: string;
  summary?: string;
}

export interface ITemplateRoute extends IDocsOptions {
  method: HttpMethod;
  path: string;
}

export interface IExecOptions extends IDocsOptions {
  docs?: boolean;
  method: HttpMethod;
  path: string;
  prefix?: string;
}

export interface IOptions extends IDocsOptions {
  docs?: boolean;
}

export interface IValidateResponse {
  isValid: boolean;
  errors?: Joi.ValidationErrorItem[];
}

export type ISchema = Joi.AnySchema;
