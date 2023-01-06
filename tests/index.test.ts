import * as express from 'express';
import * as Joi from '@hapi/joi';

import { getSwagger } from '../src/swagger';
import { router } from '../src/index';

describe('router', () => {
  it('should add a route and generate swagger definition', () => {
    const app = express();

    router.use(app).get(
      '/hello',
      {
        description: 'Hello Swagger',
        summary: 'Hello Swagger',
        tags: ['Hello Swagger'],
        output: {
          [200]: Joi.object({ test: Joi.string().example('test') }).meta({ definition: 'test' }),
        },
      },
      () => {},
    );

    expect(getSwagger()).toMatchSnapshot();
  });
});
