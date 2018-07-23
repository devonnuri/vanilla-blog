import { Router } from 'express';

import * as authCtrl from './auth.ctrl';

const Posts = Router();

Posts.post('/register', authCtrl.listPost);
Posts.post('/login', authCtrl.writePost);
Posts.post('/logout', authCtrl.readPost);

export default Posts;
