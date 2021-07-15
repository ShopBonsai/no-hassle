import { propOr } from 'ramda';

const j2s = require('joi-to-swagger');

import { ISchema, ISwaggerDefinition } from '../interfaces';
import { updateSwaggerSchemas } from '../swagger';

export const getDefinition = (
  swagger: ISwaggerDefinition,
  values: ISchema | { [key: string]: ISchema },
  type: 'Input' | 'Result',
): string => {
  const { $_terms = [] } = values;
  const { metas = [] } = $_terms;

  // Try to get 'definition' metadata from Joi
  const fallback = Math.random()
    .toString(36)
    .substr(2, 9);

  const definition = propOr(fallback, 'definition', metas[0]);

  // Concatenate definition with type
  const name = `${definition}${type}`;

  // Return already existing definition
  if (swagger.components.schemas.hasOwnProperty(name)) return name;

  // Add new definition
  const result = j2s(values, swagger.components.schemas);
  updateSwaggerSchemas({ [name]: result.swagger });

  return name;
};
