const j2s = require('joi-to-swagger');

import { IInput, ISwaggerDefinition, ISchema } from '../interfaces';
import { getDefinition } from './definition';

export const getParameters = (swagger: ISwaggerDefinition, input?: IInput) => {
  if (!input) return [];

  const { body, query, params, headers } = input;
  const result: {
    in: string;
    name: string;
    required: boolean;
    schema: {
      $ref: string;
    };
  }[] = [];

  if (body) {
    const definition = getDefinition(swagger, body, 'Input');
    result.push({
      in: 'body',
      name: definition,
      required: true,
      schema: {
        $ref: `#/definitions/${definition}`,
      },
    });
  }

  if (query) {
    const { properties, required } = j2s(query as ISchema).swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'query',
        name: key,
        required: required.includes(key),
        ...properties[key],
      });
    });
  }

  if (params) {
    const { properties } = j2s(params as ISchema).swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'path',
        name: key,
        required: true,
        ...properties[key],
      });
    });
  }

  if (headers) {
    const { properties, required = [] } = j2s(headers as ISchema).swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'header',
        name: key,
        required: required.includes(key),
        ...properties[key],
      });
    });
  }

  return result;
};
