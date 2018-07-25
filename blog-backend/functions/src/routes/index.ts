import { Router } from 'express';

import Auth from './auth';
import Posts from './posts';

const router = Router();

router.use('/auth', Auth);
router.use('/posts', Posts);

export default router;
