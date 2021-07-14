import { IDocsOptions, ISwaggerOptions, ISwaggerDefinition } from '../interfaces';
import { cleanPath } from '../lib/utils';
import { baseDefinition } from './baseDefinition';
import { getParameters } from './parameter';
import { getResponses } from './response';
import { getAuthentication } from './auth';
import { HttpMethod } from '../constants';

enum SwaggerDefaultConfig {
  VERSION = '3.0.1',
  HOST = '',
}

// TODO: move expectation to consumer
const globalSwagger: ISwaggerDefinition = {
  ...baseDefinition({
    title: 'Default swagger title',
    description: 'The API is documented here',
    servers: [{ url: 'localhost:3000' }],
    version: '1.0',
    apiVersion: '3.0.1',
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
    servers = [{ url: SwaggerDefaultConfig.HOST }],
    auth,
    ...otherOptions
  } = options;

  const authentication = getAuthentication(auth);
  const result: ISwaggerDefinition = {
    ...globalSwagger,
    ...authentication,
    servers,
    info: {
      ...globalSwagger.info,
      ...otherOptions,
    },
  };

  return result;
};
