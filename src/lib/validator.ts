import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { celebrate } from 'celebrate';

import { IValidateResponse } from '../interfaces';

export const validateSchema = (schema: object, options: object = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    celebrate(schema, options)(req, res, next);
  };
};

export const validateValue = <T>(
  value: T,
  schema: Joi.SchemaLike,
  options: Joi.ValidationOptions = { abortEarly: false },
): IValidateResponse => {
  const result = Joi.validate(value, schema, options);
  return result.error
    ? { isValid: false, errors: result.error.details }
    : { isValid: true, errors: [] };
};
