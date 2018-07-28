import { Request, Response } from '../../lib/express';
import { firestore } from 'firebase-admin';
import * as Joi from 'joi';

import { validateSchema } from '../../lib/common';

const postsRef = firestore().collection('posts');

export const listPost = async (request: Request, response: Response) => {
  const { start, limit } = request.params;

  postsRef
    .orderBy('id', 'desc')
    .startAt(Number(start))
    .limit(Number(limit))
    .get()
    .then(snapshot => {
      response.json(snapshot.docs.map(doc => doc.data()));
    });
};

export const readPost = async (request: Request, response: Response) => {
  postsRef
    .where('id', '==', Number(request.params.postId))
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
        return 0;
      }

      return snapshot.docs[0].data().id;
    });

  const document = {
    id: lastPostId + 1,
    title,
    body,
    createdAt: new Date(),
  };

  postsRef.add(document);
  response.json(document);
};

export const updatePost = async (request: Request, response: Response) => {
  const { postId } = request.params;
  const { title, body } = request.body;
  const id = await postsRef
    .where('id', '==', Number(postId))
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(404).json({
          name: 'POST_NOT_FOUND',
        });
        return null;
      }
      return snapshot.docs[0].id;
    });

  if (!id) return;

  const document = {
    id,
    title,
    body,
    date: new Date(),
  };
  postsRef.doc(id).update(document);
  response.json(document);
};
