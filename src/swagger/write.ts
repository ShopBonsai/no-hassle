import { writeFileSync } from 'fs';
import stringify from 'fast-safe-stringify';
import { ISwaggerOptions } from '../interfaces';
import { getSwagger } from './get';

/**
 * Converts title to file-friendly name.
 * For example: "Service Name" will become `openapi/service-name.json`.
 * @param title - Service title.
 */
const titleToPath = (title: string): string => `openapi/${title.toLowerCase().replace(' ', '-')}.json`;

/**
 * Returns path to file, defaults to `openapi/service-name.json`.
 * @param options - Swagger options.
 * @param path - Path override (optional).
 */
const getPath = (options: ISwaggerOptions = {}, path?: string): string => path ?? titleToPath(options.title);

/**
 * Write swagger definitions to a file.
 * @param options - Swagger options.
 * @param path - Path to file (optional), defaults to `openapi/service-name.json`
 */
export const writeSwagger = async (options: ISwaggerOptions = {}, path?: string) => {
  const swagger = getSwagger(options);
  const swaggerString = stringify(swagger);
  const swaggerPath = getPath(options, path);
  writeFileSync(swaggerPath, swaggerString);
};
