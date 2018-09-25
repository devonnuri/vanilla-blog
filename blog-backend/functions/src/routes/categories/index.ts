import { Router } from 'express';

import * as categoriesCtrl from './categories.ctrl';
import authToken from '../../lib/middleware/authToken';

const Categories = Router();

Categories.get('/', categoriesCtrl.readCategory);
Categories.get('/:parent', categoriesCtrl.readCategory);
Categories.post('/create', authToken, categoriesCtrl.createCategory);

export default Categories;
