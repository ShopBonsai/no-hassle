const swaggerConverter = require('swagger2openapi');
import { ISwaggerDefinition } from '../interfaces';

export const convert = async (version: '2.0' | '3.0', result: ISwaggerDefinition): Promise<ISwaggerDefinition> => {
  if (version === '2.0') return Promise.resolve(result);
  if (version === '3.0') {
    const { openapi } = await swaggerConverter.convertObj(result, {});
    return openapi;
  }
  return Promise.resolve({} as ISwaggerDefinition);
};
