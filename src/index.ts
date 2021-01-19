import { Application, RequestHandler } from 'express';
import { isCelebrate } from 'celebrate';
import { getSwagger, generateSwagger } from './swagger';
import { validateSchema, validateValue } from './lib/validator';
import { IOptions, IRouteResult, IExecOptions, ITemplateRoute } from './interfaces';
import { HttpMethod } from './constants';

const addRoute = (
  app: Application,
  options: IExecOptions,
  ...args: RequestHandler[]
): IRouteResult => {
  const {
    method,
    path: rawPath,
    prefix = '',
    input = null,
    schemaOptions = {},
    docs = true,
  } = options;
  const path = rawPath === '/' ? prefix : `${prefix}${rawPath}`;

  // TODO: Add method overloading -> no options provided -> basic result

  // Autogenerate documentation based on the schema
  if (docs) {
    generateSwagger(path, method, options);
  }

  // Add express route (with optional validation)
  input && Object.keys(input).length > 0
    ? app[method](path, validateSchema(input, schemaOptions), ...args)
    : app[method](path, args);

  // Return function instance with same router for currying
  return router.use(app, prefix);
};

export const router = {
  use: (app: Application, prefix: string = ''): IRouteResult => ({
    get: (path, options, ...args) =>
      addRoute(app, { ...options, path, prefix, method: HttpMethod.Get }, ...args),
    post: (path, options, ...args) =>
      addRoute(app, { ...options, path, prefix, method: HttpMethod.Post }, ...args),
    put: (path, options, ...args) =>
      addRoute(app, { ...options, path, prefix, method: HttpMethod.Put }, ...args),
    patch: (path, options, ...args) =>
      addRoute(app, { ...options, path, prefix, method: HttpMethod.Patch }, ...args),
    delete: (path, options, ...args) =>
      addRoute(app, { ...options, path, prefix, method: HttpMethod.Delete }, ...args),
    template: ({ path, method, ...otherOpts }, ...args) =>
      addRoute(app, { ...otherOpts, path, prefix, method }, ...args),
  }),
};

export const isValidationError = (error: object): boolean => isCelebrate(error);

export * from './swagger/errors';
export * from './constants';
export * from './interfaces';
export { IOptions, ITemplateRoute, getSwagger, validateValue, validateSchema };
