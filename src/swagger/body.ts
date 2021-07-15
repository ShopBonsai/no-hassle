import { IInput, ISwaggerDefinition } from '../interfaces';
import { getDefinition } from './definition';

export const getBody = (swagger: ISwaggerDefinition, input?: IInput) => {
  if (!input) return [];

  const { body } = input;

  if (body) {
    const definition = getDefinition(swagger, body, 'Input');
    return {
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${definition}`,
          },
        },
      },
      required: true,
    };
  }
};
