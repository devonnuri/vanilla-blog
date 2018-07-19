import { Router } from 'express';

const Posts = Router();

Posts.route('/get').get((request, response) => {
  response.json([
    {
      id: 1,
      title: 'Hello World!',
      body: 'WoWOWOW',
    },
    {
      id: 2,
      title: 'The Second Ppost',
      body: 'W0W0W0W0W',
    },
  ]);
});

export default Posts;
