import * as Joi from '@hapi/joi';

export const errorSchema = Joi.object({
  status: Joi.number()
    .example(500)
    .required(),

  detail: Joi.string()
    .example('Fatal issue')
    .allow(null)
    .allow('')
    .required(),

  title: Joi.string()
    .example('Unknown error')
    .required(),
});

export const badRequestErrorSchema = Joi.object({
  errors: Joi.array().items(
    errorSchema.example({
      status: 400,
      detail: '',
      title: 'Bad input request',
    }),
  ),
}).description('Provided input is invalid');

export const unauthorizedErrorSchema = Joi.object({
  errors: Joi.array().items(
    errorSchema.example({
      status: 401,
      detail: '',
      title: 'Authentication information is missing or invalid',
    }),
  ),
}).description('Authentication information is missing or invalid');

export const notFoundErrorSchema = Joi.object({
  errors: Joi.array().items(
    errorSchema.example({
      status: 404,
      detail: '',
      title: 'Not Found',
    }),
  ),
}).description('Not Found');

export const unknownErrorSchema = Joi.object({
  errors: Joi.array().items(
    errorSchema.example({
      status: 500,
      detail: '',
      title: 'Unknown error',
    }),
  ),
}).description('Unknown error');
