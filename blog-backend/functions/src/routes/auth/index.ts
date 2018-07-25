import { Router } from 'express';

import * as authCtrl from './auth.ctrl';

const Auth = Router();

Auth.post('/register', authCtrl.register);
Auth.post('/login', authCtrl.login);
Auth.post('/logout', authCtrl.logout);

export default Auth;
