import { Router, IRouterHandler } from 'express';

import * as postsCtrl from './posts.ctrl';

const Posts = Router();

Posts.get('/list', postsCtrl.listPost);
Posts.post('/write', postsCtrl.writePost);
Posts.get('/:postId', postsCtrl.readPost);

export default Posts;
