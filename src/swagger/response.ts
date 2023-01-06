import { IOutput, ISwaggerDefinition, ISchema } from '../interfaces';
import { getDefinition } from './definition';

export const getObjectDefinition = (
  swagger: ISwaggerDefinition,
  value: { [key: string]: ISchema },
) => {
  const properties = Object.entries(value).reduce((result, [key, value]) => {
    const definition = getDefinition(swagger, value as ISchema, 'Result');
    return {
      ...result,
      [key]: {
        $ref: `#/definitions/${definition}`,
      },
    };
  }, {});

  return {
    schema: {
      properties,
      type: 'object',
    },
  };
};

export const getSingleDefinition = (swagger: ISwaggerDefinition, value: ISchema) => {
  const definition = getDefinition(swagger, value, 'Result');
  return {
    schema: {
      $ref: `#/definitions/${definition}`,
    },
  };
};

type Response = {
  description: string;
  schema?: {
    $ref?: string;
  };
};

/**
 * Returns default responses.
 */
const getDefaultResponses = (): {[k: number | string]: Response} => ({
  200: {
    description: 'Success',
  },
  400: {
    description: '400 - Bad request',
    schema: {
      $ref: '#/definitions/BadRequestError',
    },
  },
  401: {
    description: '401 - Unauthorized',
    schema: {
      $ref: '#/definitions/UnauthorizedError',
    },
  },
  402: {
    description: '402 - Payment required',
  },
  403: {
    description: '403 - Forbidden',
  },
  404: {
    description: '404 - Not found',
    schema: {
      $ref: '#/definitions/NotFoundError',
    },
  },
  405: {
    description: '405 - Validation exception',
  },
  '5XX': {
    description: '500 - Unknown error',
    schema: {
      $ref: '#/definitions/UnknownError',
    },
  },
  500: {
    description: '500 - Internal server error',
  },
});

export const getResponses = (swagger: ISwaggerDefinition, output?: IOutput) => {
  const pathResponses = getDefaultResponses();
  if (output) {
    Object.entries(output).forEach(([key, value]) => {
      // Handle objects wrapping joi schema
      if (!value.isJoi && value instanceof Object) {
        Object.assign(pathResponses[key], getObjectDefinition(swagger, value));
      } else {
        Object.assign(pathResponses[key], getSingleDefinition(swagger, value as ISchema));
      }
    });
  }

  // Remove responses without schema
  return Object.entries(pathResponses).reduce((acc, [key, value]) => {
    if (value.schema) {
      return {
        ...acc,
        [key]: value,
      };
    }

    return acc;
  }, {});
};
