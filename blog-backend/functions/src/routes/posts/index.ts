import { Router } from 'express';

import * as postsCtrl from './posts.ctrl';
import authToken from '../../lib/middleware/authToken';

const Posts = Router();

Posts.get('/list', postsCtrl.listPost);
Posts.post('/write', authToken, postsCtrl.writePost);
Posts.get('/:postId', postsCtrl.readPost);

export default Posts;
