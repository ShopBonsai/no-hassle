import * as Joi from 'joi';

export const errorSchema = Joi.object({
  message: Joi.string()
    .example('My message')
    .description('Error message.')
    .required(),

  name: Joi.string()
    .example('Specific Error')
    .description('Error name.')
    .required(),

}).meta({ definition: 'apiError' });
