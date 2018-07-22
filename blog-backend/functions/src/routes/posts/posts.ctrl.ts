import { Request, Response } from 'express';
import { firestore, initializeApp } from 'firebase-admin';
import * as Joi from 'joi';

import { validateSchema } from '../../lib/common';

const postRef = firestore().collection('post');

export const listPost = async (_, response: Response) => {
  postRef.get().then(snapshot => {
    console.log(require('util').inspect(snapshot));
  });
};

export const readPost = async (request: Request, response: Response) => {
  // const post = await Post.findOne({
  //   id: request.params.postId,
  // });
  // if (post) {
  //   response.json(post);
  // } else {
  //   response.status(404).json({
  //     name: 'POST_NOT_FOUND',
  //   });
  // }
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

  // const { title, body } = request.body;

  // const post = new Post({
  //   id: Post.getLastPostId() + 1,
  //   title,
  //   body,
  //   createdAt: new Date(),
  // });
  // post.save();
  // response.json(post);
};
