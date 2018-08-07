import { Router } from 'express';

import * as postsCtrl from './posts.ctrl';
import authToken from '../../lib/middleware/authToken';

const Posts = Router();

Posts.get('/count', postsCtrl.countPost);
Posts.get('/:start/:limit/:reverse', postsCtrl.listPost);
Posts.get('/:start/:limit', postsCtrl.listPost);
Posts.get('/:postId', postsCtrl.readPost);
Posts.post('/write', authToken, postsCtrl.writePost);
Posts.post('/update/:postId', authToken, postsCtrl.updatePost);
Posts.post('/upload', authToken, postsCtrl.uploadFile);

export default Posts;
