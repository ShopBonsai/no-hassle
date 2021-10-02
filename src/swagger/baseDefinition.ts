const j2s = require('joi-to-swagger');

import { ISwaggerDefinition } from '../interfaces';
import {
  unknownErrorSchema,
  badRequestErrorSchema,
  notFoundErrorSchema,
  unauthorizedErrorSchema,
} from './errors';

export const baseDefinition = ({
  title,
  description,
  servers,
  contact,
  version,
  apiVersion = '3.0',
}): ISwaggerDefinition => ({
  servers,
  openapi: apiVersion,
  info: {
    title,
    description,
    version,
    contact,
  },
  paths: {},
  components: {
    schemas: {
      BadRequestError: j2s(badRequestErrorSchema).swagger,
      NotFoundError: j2s(notFoundErrorSchema).swagger,
      UnauthorizedError: j2s(unauthorizedErrorSchema).swagger,
      UnknownError: j2s(unknownErrorSchema).swagger,
    },
  },
});
