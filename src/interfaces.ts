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

export enum SchemeType {
  Http = 'http',
  Https = 'https',
  Ws = 'ws',
  Wss = 'wss',
}

export interface ISwaggerBaseDefinition {
  title: string;
  description: string;
  host: string;
  schemes: SchemeType[];
  basePath: string;
  contact?: { email: string };
  version?: string;
  apiVersion?: string;
}

export interface ISwaggerDefinition {
  swagger: string;
  host: string;
  basePath: string;
  schemes: SchemeType[];
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

export enum AuthenticationTypes {
  BASIC = 'basic',
  API_KEY = 'apiKey',
}

export type AuthenticationType = `${AuthenticationTypes}`;

export type AuthenticationOptions = { apiKeyHeaderName?: string };

export interface ISwaggerOptions {
  title?: string;
  description?: string;
  host?: string;
  schemes?: SchemeType[];
  basePath?: string;
  apiVersion?: '2.0' | '3.0';
  version?: string;
  auth?: AuthenticationType;
  authOptions?: AuthenticationOptions;
}

export interface IInput {
  body?: ISchema;
  query?: ISchema | object;
  params?: ISchema | object;
  headers?: ISchema | object;
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
  /**
   * The prefix to add to the route path.
   */
  prefix?: string;
  /**
   * Whether to omit the URL prefix from the generated documentation.
   */
  shouldOmitPrefixInDocs?: boolean;
}

export interface ITemplateRoute extends IDocsOptions {
  method: HttpMethod;
  path: string;
}

export interface IExecOptions extends IDocsOptions {
  /**
   * Whether to generate documentation for this route.
   */
  docs?: boolean;
  /**
   * The HTTP method of the route.
   */
  method: HttpMethod;
  /**
   * The path of the route.
   */
  path: string;
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
