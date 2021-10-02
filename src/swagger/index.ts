import { IDocsOptions, ISwaggerOptions, ISwaggerDefinition } from '../interfaces';
import { cleanPath } from '../lib/utils';
import { baseDefinition } from './baseDefinition';
import { getParameters } from './parameter';
import { getResponses } from './response';
import { getAuthentication } from './auth';
import { HttpMethod } from '../constants';
import { getBody } from './body';

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

export const updateSwaggerSchemas = (values: object) => {
  Object.assign(globalSwagger.components.schemas, values);
};

export const generateSwagger = (path: string, method: HttpMethod, options: IDocsOptions) => {
  const { input, output, summary, description, tags = [] } = options;
  const requestBody = getBody(globalSwagger, input);

  const cleanedPath = cleanPath(path);

  const result = {
    [method]: {
      tags,
      // optional
      ...(summary && { summary }),
      ...(description && { description }),
      ...(requestBody && { requestBody }),
      parameters: getParameters(input),
      responses: getResponses(globalSwagger, output),
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
