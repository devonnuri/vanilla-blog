import { Router } from 'express';

import * as categoriesCtrl from './categories.ctrl';
import authToken from '../../lib/middleware/authToken';

const Categories = Router();

Categories.post('/create', authToken, categoriesCtrl.createCategory);

export default Categories;
