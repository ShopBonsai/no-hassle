import j2s from 'joi-to-swagger';

import { ISchema, ISwaggerDefinition } from '../interfaces';
import { updateSwagger } from '../swagger';

export const getDefinition = (swagger: ISwaggerDefinition, values: ISchema | { [key: string]: ISchema }, type: 'Input' | 'Result'): string => {
  const { _meta: meta = [] } = values;

  // Try to get 'definition' metadata from Joi
  const definition =
    (meta[0] || {}).definition ||
    Math.random()
      .toString(36)
      .substr(2, 9);

  // Concatenate definition with type
  const name = `${definition}${type}`;

  // Return already existing definition
  if (swagger.definitions.hasOwnProperty(name)) return name;

  // Add new definition
  const result = j2s(values as ISchema, swagger.definitions);
  updateSwagger('definitions', { [name]: result.swagger });

  return name;
};
