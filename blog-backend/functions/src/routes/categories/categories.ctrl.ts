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
    parent: Joi.string().required(),
    secret: Joi.boolean().required(),
  });

  if (!validateSchema(request, response, schema)) {
    return;
  }

  const { name, parent, secret } = request.body;

  const document = {
    name,
    parent,
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

export const readCategory = (request: Request, response: Response) => {
  const { parent } = request.params;

  let querySnapshot = categoriesRef.get();

  if (parent) {
    querySnapshot = categoriesRef.where('parent', '==', parent).get();
  }

  querySnapshot
    .then(snapshot => {
      response.json(
        snapshot.docs.map(doc => {
          const { name, parent, secret } = doc.data();
          return {
            id: doc.id,
            name,
            parent,
            secret,
          };
        })
      );
    })
    .catch(error => {
      console.error(error);
      response.sendStatus(500);
    });
};
