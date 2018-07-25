import { Router } from 'express';

import * as postsCtrl from './posts.ctrl';
import needsAuth from '../../lib/middleware/needsAuth';

const Posts = Router();

Posts.get('/list', postsCtrl.listPost);
Posts.post('/write', needsAuth, postsCtrl.writePost);
Posts.get('/:postId', postsCtrl.readPost);

export default Posts;
