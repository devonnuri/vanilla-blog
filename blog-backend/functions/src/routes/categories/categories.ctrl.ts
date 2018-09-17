import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';
import * as Joi from 'joi';
import { validateSchema } from '../../lib/common';

const categoriesRef = firestore().collection('categories');

export const createCategory = (request: Request, response: Response) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .min(1)
      .max(50),
    root: Joi.string(),
    secret: Joi.boolean(),
  });

  if (!validateSchema(request, response, schema)) {
    return;
  }

  const { name, root, secret } = request.body;

  const document = {
    name,
    root,
    secret,
  };

  categoriesRef
    .add(document)
    .then(() => {
      response.json(document);
    })
    .catch(() => {
      response.sendStatus(500);
    });
};
