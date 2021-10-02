import { IOutput, ISchema, ISwaggerDefinition } from '../interfaces';
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
        $ref: `#/components/schemas/${definition}`,
      },
    };
  }, {});

  return {
    content: {
      'application/json': {
        schema: {
          properties,
          type: 'object',
        },
      },
    },
  };
};

export const getSingleDefinition = (swagger: ISwaggerDefinition, value: ISchema) => {
  const definition = getDefinition(swagger, value, 'Result');
  return {
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${definition}`,
        },
      },
    },
  };
};

export const getResponses = (swagger: ISwaggerDefinition, output?: IOutput) => {
  const responses = {
    200: {
      description: 'Success',
      content: {},
    },
    400: {
      description: '400 - Bad request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/BadRequestError',
          },
        },
      },
    },
    401: {
      description: '401 - Unauthorized',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UnauthorizedError',
          },
        },
      },
    },
    404: {
      description: '404 - Not found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/NotFoundError',
          },
        },
      },
    },
    405: {
      description: '405 - Validation exception',
      content: {},
    },
    '5XX': {
      description: '500 - Unknown error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UnknownError',
          },
        },
      },
    },
  };

  if (output) {
    Object.entries(output).forEach(([key, value]) => {
      // Handle objects wrapping joi schema - use random method that exists on Joi value only
      if (!value.hasOwnProperty('$_terms') && value instanceof Object) {
        Object.assign(responses[key], getObjectDefinition(swagger, value as any));
      } else {
        Object.assign(responses[key], getSingleDefinition(swagger, value as ISchema));
      }
    });
  }

  return responses;
};
