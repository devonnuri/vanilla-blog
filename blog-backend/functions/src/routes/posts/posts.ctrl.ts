import { Request, Response } from 'express';
import * as Joi from 'joi';

import Post from '../../models/Post';
import { validateSchema } from '../../lib/common';

export const listPost = async (_, response: Response) => {
  response.json(await Post.find());
};

export const readPost = async (request: Request, response: Response) => {
  response.json(
    await Post.findOne({
      id: request.params.postId,
    })
  );
};

export const writePost = async (request: Request, response: Response) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });

  if (!validateSchema(request, response, schema)) {
    return;
  }

  const { title, body } = request.body;

  const lastPost = (await Post.findOne(
    {},
    {},
    {
      sort: {
        createdAt: -1,
      },
    }
  )) || { id: 0 };

  const post = new Post({
    id: lastPost.id + 1,
    title,
    body,
    createdAt: new Date(),
  });
  post.save();
  response.json(post);
};
