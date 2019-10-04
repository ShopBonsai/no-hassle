import { IMethod, IDocsOptions, ISwaggerOptions, ISwaggerDefinition } from '../interfaces';
import { cleanPath } from '../lib/utils';
import { baseDefinition } from './baseDefinition';
import { getParameters } from './parameter';
import { getResponses } from './response';
import { getAuthentication } from './auth';

const globalSwagger: ISwaggerDefinition = {
  ...baseDefinition({
    title: 'Default swagger title',
    description: 'The API is documented here',
    host: 'localhost:3000',
    basePath: '/',
  }),
};

export const updateSwagger = (key: string, values: object) => Object.assign(globalSwagger[key], values);

export const generateSwagger = (path: string, method: IMethod, options: IDocsOptions) => {
  const { input, output, summary, description, tags = [] } = options;

  const cleanedPath = cleanPath(path);
  const result = {
    [method]: {
      tags,
      produces: ['application/json'],
      parameters: getParameters(globalSwagger, input),
      responses: getResponses(globalSwagger, output),
    },
  };

  // Optional properties
  if (summary) Object.assign(result[method], { summary });
  if (description) Object.assign(result[method], { description });

  // If path already exists (other method for example)
  if (globalSwagger.paths.hasOwnProperty(cleanedPath)) {
    Object.assign(globalSwagger.paths[cleanedPath], result);
  } else {
    updateSwagger('paths', { [cleanedPath]: result });
  }
};

export const getSwagger = (options: ISwaggerOptions = {}): ISwaggerDefinition => {
  const { apiVersion = '2.0', host = '', auth, ...otherOptions } = options;

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
