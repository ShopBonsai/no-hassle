import { IDocsOptions, ISwaggerOptions, ISwaggerDefinition } from '../interfaces';
import { cleanPath } from '../lib/utils';
import { baseDefinition } from './baseDefinition';
import { getParameters } from './parameter';
import { getResponses } from './response';
import { getAuthentication } from './auth';
import { HttpMethod } from '../constants';

enum SwaggerDefaultConfig {
  VERSION = '2.0',
  HOST = '',
}

// TODO: move expectation to consumer
const globalSwagger: ISwaggerDefinition = {
  ...baseDefinition({
    title: 'Default swagger title',
    description: 'The API is documented here',
    host: 'localhost:3000',
    basePath: '/',
    version: '1.0',
    apiVersion: '2.0',
    contact: { email: 'developers@shopbonsai.com' },
  }),
};

export const updateSwagger = (key: string, values: object) =>
  Object.assign(globalSwagger[key], values);

export const generateSwagger = (path: string, method: HttpMethod, options: IDocsOptions) => {
  const {
    input,
    output,
    contentTypes = ['application/json'],
    summary,
    description,
    tags = [],
  } = options;

  const cleanedPath = cleanPath(path);

  const result = {
    [method]: {
      tags,
      produces: contentTypes,
      parameters: getParameters(globalSwagger, input),
      responses: getResponses(globalSwagger, output),
      // optional
      ...(summary && { summary }),
      ...(description && { description }),
    },
  };
  // If path already exists (other method for example)
  if (globalSwagger.paths.hasOwnProperty(cleanedPath)) {
    Object.assign(globalSwagger.paths[cleanedPath], result);
  } else {
    updateSwagger('paths', { [cleanedPath]: result });
  }
};

export const getSwagger = (options: ISwaggerOptions = {}): ISwaggerDefinition => {
  const {
    apiVersion = SwaggerDefaultConfig.VERSION,
    host = SwaggerDefaultConfig.HOST,
    auth,
    ...otherOptions
  } = options;

  const authentication = getAuthentication(auth);
  const result: ISwaggerDefinition = {
    ...globalSwagger,
    ...authentication,
    host,
    info: {
      ...globalSwagger.info,
      ...otherOptions,
    },
  };

  return result;
};
