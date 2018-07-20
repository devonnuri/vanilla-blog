import { Router, IRouterHandler } from 'express';

import * as postsCtrl from './posts.ctrl';

const Posts = Router();

Posts.get('/list', postsCtrl.listPost);
Posts.post('/get', postsCtrl.getPost);
Posts.post('/write', postsCtrl.writePost);

export default Posts;
