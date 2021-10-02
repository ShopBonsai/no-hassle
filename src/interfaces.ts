import * as Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import { HttpMethod } from './constants';

export interface IRouteResult {
  get: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  post: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  put: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  patch: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  delete: (path: string, options: IOptions, ...args: RequestHandler[]) => IRouteResult;
  template: (template: ITemplateRoute, ...args: RequestHandler[]) => IRouteResult;
}

export interface ISwaggerBaseDefinition {
  title: string;
  description: string;
  host: string;
  basePath: string;
  contact?: { email: string };
  version?: string;
  apiVersion?: string;
}

export interface ISwaggerDefinition {
  swagger: string;
  host: string;
  basePath: string;
  info: {
    description: string;
    version: string;
    title: string;
    contact: {
      email: string;
    };
  };
  paths: {};
  definitions: {};
}

export interface ISwaggerOptions {
  title?: string;
  description?: string;
  host?: string;
  basePath?: string;
  apiVersion?: '2.0' | '3.0';
  version?: string;
  auth?: 'basic';
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
  contentTypes?: string[];
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

export type ISchema = Joi.Schema & {
  _meta?: [];
};
