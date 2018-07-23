import { Router } from 'express';

import * as authCtrl from './auth.ctrl';

const Posts = Router();

Posts.post('/register', authCtrl.register);
Posts.post('/login', authCtrl.login);
Posts.post('/logout', authCtrl.logout);

export default Posts;
