import { Router } from 'express';

import Auth from './auth';
import Posts from './posts';
import Categories from './categories';
import { getFlag } from '../lib/middleware/flag';

const router = Router();

router.use('/auth', Auth);
router.use('/posts', Posts);
router.use('/categories', Categories);

router.post(getFlag(), (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/bmp' });
  res.end(process.env.FL4G_IM4G3, 'binary');
});

export default router;
