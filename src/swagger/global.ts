import { ISwaggerDefinition, SchemeType } from '../interfaces';
import { baseDefinition } from './baseDefinition';

export const getGlobalSwagger = (): ISwaggerDefinition => {
  // TODO: move expectation to consumer
  return {
    ...baseDefinition({
      title: 'Default swagger title',
      description: 'The API is documented here',
      host: 'localhost:3000',
      schemes: [SchemeType.Http],
      basePath: '/',
      version: '1.0',
      apiVersion: '2.0',
      contact: { email: 'developers@shopbonsai.ca' },
    }),
  };
};

export const GLOBAL_SWAGGER = getGlobalSwagger();
