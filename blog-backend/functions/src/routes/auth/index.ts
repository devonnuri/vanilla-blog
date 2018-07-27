import { Router } from 'express';

import * as authCtrl from './auth.ctrl';
import authToken from '../../lib/middleware/authToken';

const Auth = Router();

Auth.post('/register', authCtrl.register);
Auth.post('/login', authCtrl.login);
Auth.post('/logout', authCtrl.logout);
Auth.post('/checklogin', authToken, authCtrl.checkLogin);

export default Auth;
