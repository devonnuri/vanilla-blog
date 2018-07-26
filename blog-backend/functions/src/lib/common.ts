import { Request, Response } from 'express';
import * as Joi from 'joi';

export const validateSchema = (request: Request, response: Response, schema: any) => {
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(400).json({
      name: 'WRONG_SCHEMA',
      payload: result.error,
    });

    return false;
  }
  return true;
};
