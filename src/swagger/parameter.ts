const j2s = require('joi-to-swagger');

import { IInput, ISchema } from '../interfaces';

export const getParameters = (input?: IInput) => {
  if (!input) return [];

  const { query, params } = input;
  const result: {
    in: string;
    name: string;
    required?: boolean;
    description?: string;
    schema: {
      type: string;
    };
  }[] = [];

  if (params) {
    const { swagger } = j2s(params as ISchema);
    const { properties } = swagger;

    Object.keys(properties).forEach((key) => {
      const { description, required, ...schemaProperties } = properties[key];

      result.push({
        in: 'path',
        name: key,
        // tslint:disable-next-line: object-shorthand-properties-first
        description,
        required: true,
        schema: {
          ...schemaProperties,
        },
      });
    });
  }

  if (query) {
    const { swagger } = j2s(query as ISchema);
    const { properties } = swagger;

    Object.keys(properties).forEach((key) => {
      const { description, required, ...schemaProperties } = properties[key];

      result.push({
        in: 'query',
        name: key,
        // tslint:disable-next-line: object-shorthand-properties-first
        description,
        // tslint:disable-next-line: object-shorthand-properties-first
        required,
        schema: {
          ...schemaProperties,
        },
      });
    });
  }

  return result;
};
