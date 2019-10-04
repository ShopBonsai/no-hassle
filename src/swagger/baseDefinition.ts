const j2s = require('joi-to-swagger');

import { ISwaggerDefinition, ISwaggerBaseDefinition } from '../interfaces';
import {
  unknownErrorSchema,
  badRequestErrorSchema,
  notFoundErrorSchema,
  unauthorizedErrorSchema,
} from './errors';

export const baseDefinition = ({ title, description, host, basePath }: ISwaggerBaseDefinition): ISwaggerDefinition => ({
  host,
  basePath,
  swagger: '2.0',
  info: {
    title,
    description,
    version: '1.0.0',
    contact: {
      email: 'developers@shopbonsai.ca',
    },
  },
  paths: {},
  definitions: {
    BadRequestError: j2s(badRequestErrorSchema).swagger,
    NotFoundError: j2s(notFoundErrorSchema).swagger,
    UnauthorizedError: j2s(unauthorizedErrorSchema).swagger,
    UnknownError: j2s(unknownErrorSchema).swagger,
  },
});
