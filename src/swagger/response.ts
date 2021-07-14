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
        $ref: `#/components/${definition}`,
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
      $ref: `#/components/${definition}`,
    },
  };
};

export const getResponses = (swagger: ISwaggerDefinition, output?: IOutput) => {
  const responses = {
    200: {
      description: 'Success',
    },
    400: {
      description: '400 - Bad request',
      schema: {
        $ref: '#/components/BadRequestError',
      },
    },
    401: {
      description: '401 - Unauthorized',
      schema: {
        $ref: '#/components/UnauthorizedError',
      },
    },
    404: {
      description: '404 - Not found',
      schema: {
        $ref: '#/components/NotFoundError',
      },
    },
    405: {
      description: '405 - Validation exception',
    },
    '5XX': {
      description: '500 - Unknown error',
      schema: {
        $ref: '#/components/UnknownError',
      },
    },
  };

  if (output) {
    Object.entries(output).forEach(([key, value]) => {
      // Handle objects wrapping joi schema
      // TODO: Fix !value.isJoi!!!
      if (value instanceof Object) {
        Object.assign(responses[key], getObjectDefinition(swagger, value));
      } else {
        Object.assign(responses[key], getSingleDefinition(swagger, value as ISchema));
      }
    });
  }

  return responses;
};
