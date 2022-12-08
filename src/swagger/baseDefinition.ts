const j2s = require('joi-to-swagger');

import { ISwaggerDefinition, ISwaggerBaseDefinition } from '../interfaces';
import {
  unknownErrorSchema,
  badRequestErrorSchema,
  notFoundErrorSchema,
  unauthorizedErrorSchema,
} from './errors';

export const baseDefinition = ({
  title,
  description,
  host,
  schemes,
  basePath,
  contact,
  version,
  apiVersion = '2.0',
}: ISwaggerBaseDefinition): ISwaggerDefinition => ({
  host,
  schemes,
  basePath,
  swagger: apiVersion,
  info: {
    title,
    description,
    version,
    contact,
  },
  paths: {},
  definitions: {
    BadRequestError: j2s(badRequestErrorSchema).swagger,
    NotFoundError: j2s(notFoundErrorSchema).swagger,
    UnauthorizedError: j2s(unauthorizedErrorSchema).swagger,
    UnknownError: j2s(unknownErrorSchema).swagger,
  },
});
