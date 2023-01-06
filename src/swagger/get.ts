import { IDocsOptions, ISwaggerOptions, ISwaggerDefinition, SchemeType } from '../interfaces';
import { cleanPath } from '../lib/utils';
import { getParameters } from './parameter';
import { getResponses } from './response';
import { getAuthentication } from './auth';
import { HttpMethod } from '../constants';
import { GLOBAL_SWAGGER } from './global';

enum SwaggerDefaultConfig {
  VERSION = '2.0',
  HOST = '',
}

export const updateSwagger = (swagger: ISwaggerDefinition, key: string, values: object) =>
  Object.assign(swagger[key], values);

const getPath = (path: string, prefix: string, shouldOmitPrefix: boolean) => {
  const cleanedPath = cleanPath(path);

  if (shouldOmitPrefix) {
    const prefixRegex = new RegExp(`^${prefix}`);
    const newPath = cleanedPath.replace(prefixRegex, '');

    if (newPath === '') {
      return '/';
    }

    return newPath;
  }

  return cleanedPath;
};

export const generateSwagger = (
  swagger: ISwaggerDefinition,
  path: string,
  method: HttpMethod,
  options: IDocsOptions,
) => {
  const {
    input,
    output,
    contentTypes = ['application/json'],
    summary,
    description,
    tags = [],
    shouldOmitPrefixInDocs = false,
    prefix = '',
    externalDocs,
  } = options;

  const cleanedPath = getPath(path, prefix, shouldOmitPrefixInDocs);

  const result = {
    [method]: {
      tags,
      produces: contentTypes,
      parameters: getParameters(swagger, input),
      responses: getResponses(swagger, output),
      // optional
      ...(summary && { summary }),
      ...(description && { description }),
      ...(externalDocs && { externalDocs }),
    },
  };
  // If path already exists (other method for example)
  if (swagger.paths.hasOwnProperty(cleanedPath)) {
    updateSwagger(swagger, 'paths', {
      [cleanedPath]: {
        ...swagger.paths[cleanedPath],
        ...result,
      },
    });
  } else {
    updateSwagger(swagger, 'paths', { [cleanedPath]: result });
  }
};

/**
 * Get the swagger definition.
 * @param options - Swagger definition to override the default one.
 * @param baseSwagger - Base swagger definition. Useful for tests, to avoid global pollution.
 */
export const getSwagger = (
  options: ISwaggerOptions = {},
  baseSwagger: ISwaggerDefinition = GLOBAL_SWAGGER,
): ISwaggerDefinition => {
  const {
    host = SwaggerDefaultConfig.HOST,
    schemes = [SchemeType.Http],
    auth,
    authOptions,
    ...otherOptions
  } = options;

  const authentication = getAuthentication(auth, authOptions);
  const result: ISwaggerDefinition = {
    ...baseSwagger,
    ...authentication,
    host,
    schemes,
    info: {
      ...baseSwagger.info,
      ...otherOptions,
    },
  };

  return result;
};
