import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';
import * as Joi from 'joi';

import { validateSchema } from '../../lib/common';

const postsRef = firestore().collection('post');

export const listPost = async (_, response: Response) => {
  postsRef.get().then(snapshot => {
    const list = [];
    snapshot.forEach(document => {
      list.push(document.data());
    });
    response.json(snapshot);
  });
};

export const readPost = async (request: Request, response: Response) => {
  postsRef
    .where('id', '==', Number(request.params.id))
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(404).json({
          name: 'POST_NOT_FOUND',
        });
        return;
      }

      response.json(snapshot.docs[0].data());
    });
};

export const writePost = async (request: Request, response: Response) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .required()
      .min(1)
      .max(120),
    body: Joi.string()
      .required()
      .min(1),
  });

  if (!validateSchema(request, response, schema)) {
    return;
  }

  const { title, body } = request.body;

  const lastPostId = await postsRef
    .orderBy('id', 'desc')
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return 1;
      }

      return snapshot.docs[0].data().id;
    });

  response.json(postsRef.add({ id: lastPostId + 1, title, body, createdAt: new Date() }));
};
