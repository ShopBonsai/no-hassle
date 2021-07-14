import { propOr } from 'ramda';

const j2s = require('joi-to-swagger');

import { ISchema, ISwaggerDefinition } from '../interfaces';
import { updateSwaggerSchemas } from '../swagger';

export const getDefinition = (
  swagger: ISwaggerDefinition,
  values: ISchema | { [key: string]: ISchema },
  type: 'Input' | 'Result',
  ): string => {
    console.log('values: ', values);
    const { _meta: meta = [] } = values;

    // Try to get 'definition' metadata from Joi
    const fallback = Math.random()
    .toString(36)
    .substr(2, 9);

    // TODO: Fix below to access meta again as it's currently undefined!
    const definition = propOr(fallback, 'definition', meta[0]);

    // Concatenate definition with type
    const name = `${definition}${type}`;

    // Return already existing definition
    if (swagger.components.schemas.hasOwnProperty(name)) return name;

    console.log('swagger: ', swagger);
  // Add new definition
  const result = j2s(values, swagger.components.schemas);
  console.log('result: ', result);
  updateSwaggerSchemas({ [name]: result.swagger });

  return name;
};
