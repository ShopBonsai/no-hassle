import { writeFileSync } from 'fs';
import stringify from 'fast-safe-stringify';
import { getSwagger } from './index';
import { ISwaggerOptions } from '../interfaces';

export const generateSwagger = async (options: ISwaggerOptions = {}) => {
  const swagger = getSwagger(options);
  const swaggerString = stringify(swagger);
  writeFileSync('openapi.json', swaggerString);
};
