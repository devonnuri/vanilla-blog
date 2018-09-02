import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';
import * as Joi from 'joi';
import { validateSchema } from '../../lib/common';

const tagsRef = firestore().collection('tags');

export const createTag = async (request: Request, response: Response) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .min(1)
      .max(50),
  });

  if (!validateSchema(request, response, schema)) {
    return;
  }

  const { name } = request.body;

  tagsRef.add({ name });
  response.json({ name });
};

export const listTag = async (request: Request, response: Response) => {
  tagsRef
    .get()
    .then(snapshot => {
      response.json(snapshot.docs.map(doc => doc.data()));
    })
    .catch(() => {
      response.sendStatus(500);
    });
};

export const deleteTag = async (request: Request, response: Response) => {
  tagsRef
    .where('name', '==', request.params.tagName)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(404).json({
          name: 'TAG_NOT_FOUND',
        });
        return;
      }
      snapshot.docs[0].ref.delete();
      response.sendStatus(204);
    });
};
