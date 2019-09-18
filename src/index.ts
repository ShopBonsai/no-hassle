import { Application, RequestHandler } from 'express';
import { isCelebrate } from 'celebrate';
import { getSwagger, generateSwagger } from './swagger';
import { validateSchema, validateValue } from './lib/validator';
import { IOptions, IRouteResult, IExecOptions } from './interfaces';

// integrates joi to TS
import 'joi-extract-type';

const addRoute = (app: Application, options: IExecOptions, ...args: RequestHandler[]): IRouteResult => {
  const { method, path, input = null, schemaOptions = {}, docs = true } = options;

  // TODO: Add method overloading -> no options provided -> basic result

  // Autogenerate documentation based on the schema
  if (docs) {
    generateSwagger(path, method, options);
  }

  // Add express route (with optional validation)
  input ? app[method](path, validateSchema(input, schemaOptions), ...args) : app[method](path, args);

  // Return function instance with same router for currying
  return router.use(app);
};

export const router = {
  use: (app: Application): IRouteResult => ({
    get: (path, options, ...args) => addRoute(app, { ...options, path, method: 'get' }, ...args),
    post: (path, options, ...args) => addRoute(app, { ...options, path, method: 'post' }, ...args),
    put: (path, options, ...args) => addRoute(app, { ...options, path, method: 'put' }, ...args),
    patch: (path, options, ...args) =>
      addRoute(app, { ...options, path, method: 'patch' }, ...args),
    delete: (path, options, ...args) =>
      addRoute(app, { ...options, path, method: 'delete' }, ...args),
  }),
};

export const isValidationError = (error: object): boolean => isCelebrate(error);

export * from './swagger/errors';
export { IOptions, getSwagger, validateValue };
