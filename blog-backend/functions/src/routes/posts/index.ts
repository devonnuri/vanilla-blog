import { Router } from 'express';

import * as postsCtrl from './posts.ctrl';
import authToken from '../../lib/middleware/authToken';

const Posts = Router();

Posts.get('/:start/:limit', postsCtrl.listPost);
Posts.get('/:postId', postsCtrl.readPost);
Posts.post('/write', authToken, postsCtrl.writePost);
Posts.post('/update/:postId', postsCtrl.updatePost);

export default Posts;
