import { Router } from 'express';

import * as postsCtrl from './tags.ctrl';
import authToken from '../../lib/middleware/authToken';

const Tags = Router();

Tags.get('/', postsCtrl.listTag);
Tags.post('/create/:tagName', authToken, postsCtrl.createTag);
Tags.post('/delete/:tagName', authToken, postsCtrl.deleteTag);

export default Tags;
