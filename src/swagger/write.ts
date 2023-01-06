import { writeFileSync, mkdirSync } from 'fs';
import stringify from 'fast-safe-stringify';
import { parse } from 'path';
import { ISwaggerOptions } from '../interfaces';
import { getSwagger } from './get';
import { GLOBAL_SWAGGER } from '../constants';

/**
 * Write swagger definitions to a file.
 * @param options - Swagger options.
 * @param path - Path to file (optional), defaults to `./openapi/api.json`
 */
export const writeSwagger = (options: ISwaggerOptions = {}, path: string = './openapi/api.json'): void => {
  const swagger = getSwagger(options, GLOBAL_SWAGGER);
  const swaggerString = stringify(swagger);
  mkdirSync(parse(path).dir, { recursive: true });
  writeFileSync(path, swaggerString);
  console.log(`Generated swagger doc in ${path}`);
};
