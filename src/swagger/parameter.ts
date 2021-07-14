const j2s = require('joi-to-swagger');

import { IInput, ISchema } from '../interfaces';

export const getParameters = (input?: IInput) => {
  if (!input) return [];

  const { query, params } = input;
  const result: {
    in: string;
    name: string;
    required: boolean;
    schema: {
      $ref: string;
    };
  }[] = [];

  if (query) {
    const { swagger } = j2s(query as ISchema);
    const { properties } = swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'query',
        name: key,
        ...properties[key],
      });
    });
  }

  if (params) {
    const { swagger } = j2s(params as ISchema);
    const { properties } = swagger;

    Object.keys(properties).forEach((key) => {
      result.push({
        in: 'path',
        name: key,
        required: true,
        ...properties[key],
      });
    });
  }

  return result;
};
