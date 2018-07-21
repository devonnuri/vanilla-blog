import { Request, Response } from 'express';
import * as Joi from 'joi';

import Post from '../../models/Post';
import { validateSchema } from '../../lib/common';

export const listPost = async (_, response: Response) => {
  response.json(await Post.find());
};

export const readPost = async (request: Request, response: Response) => {
  const post = await Post.findOne({
    id: request.params.postId,
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).json({
      name: 'POST_NOT_FOUND',
    });
  }
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

  const post = new Post({
    id: Post.getLastPostId() + 1,
    title,
    body,
    createdAt: new Date(),
  });
  post.save();
  response.json(post);
};
