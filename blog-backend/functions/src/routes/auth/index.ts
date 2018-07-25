import { Router } from 'express';

import * as authCtrl from './auth.ctrl';

const Auth = Router();

Auth.post('/auth/register', authCtrl.register);
Auth.post('/auth/login', authCtrl.login);
Auth.post('/auth/logout', authCtrl.logout);

export default Auth;
