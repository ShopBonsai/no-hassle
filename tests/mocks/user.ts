import * as Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string()
    .example('Rudolf')
    .description('User name.')
    .required(),
}).meta({ definition: 'user' });
