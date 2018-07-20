import { Request, Response } from 'express';
import Joi from 'joi';

import Post from '../../models/Post';

export const listPost = async (_, response: Response) => {
  response.json(await Post.find());
};

export const readPost = async (request: Request, response: Response) => {
  response.json(
    await Post.findOne({
      id: request.params.id,
    })
  );
};

export const writePost = async (request: Request, response: Response) => {
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
    ...args,
    createdAt: new Date(),
  });
  post.save();
  response.json(post);
};
