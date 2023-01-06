import * as Joi from '@hapi/joi';

import { generateSwagger, getGlobalSwagger, getSwagger } from '../src/swagger/get';
import { HttpMethod } from '../src/constants';

describe('generateSwagger', () => {
  it('should generate swagger', () => {
    const swagger = getGlobalSwagger();

    generateSwagger(swagger, '/test', HttpMethod.Get, {
      output: {
        200: Joi.object({ test: Joi.string() }).meta({ definition: 'test' }),
      },
    });

    expect(getSwagger(undefined, swagger)).toMatchSnapshot();
  });

  it('should generate swagger for multiple paths with different responses', () => {
    const swagger = getGlobalSwagger();

    generateSwagger(swagger, '/test', HttpMethod.Get, {
      input: {
        query: Joi.object({ test: Joi.string().example('test') }),
      },
      output: {
        200: Joi.object({ test: Joi.string().example('test') }).meta({ definition: 'test' }),
      },
    });

    generateSwagger(swagger, '/test2', HttpMethod.Get, {
      input: {
        query: Joi.object({ test: Joi.string().example('test2') }),
      },
      output: {
        200: Joi.object({ test: Joi.string().example('test2') }).meta({ definition: 'test2' }),
      },
    });

    expect(getSwagger(undefined, swagger)).toMatchSnapshot();
  });

  it('should generate swagger for the same path with different methods', () => {
    const swagger = getGlobalSwagger();

    generateSwagger(swagger, '/test', HttpMethod.Get, {
      input: {
        query: Joi.object({ test: Joi.string().example('get test') }),
      },
      output: {
        200: Joi.object({ test: Joi.string().example('get test') }).meta({ definition: 'get test' }),
      },
    });

    generateSwagger(swagger, '/test', HttpMethod.Post, {
      input: {
        query: Joi.object({ test: Joi.string().example('post test') }),
      },
      output: {
        200: Joi.object({ test: Joi.string().example('post test') }).meta({ definition: 'post test' }),
      },
    });

    expect(getSwagger(undefined, swagger)).toMatchSnapshot();
  });
});
