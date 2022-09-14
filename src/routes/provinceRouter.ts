import { Router } from 'express';

import {
  createProvince,
  getAllProvince,
} from '../controller/provinceController';

const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/',verifyToken, createProvince);
router.get('/', getAllProvince);

export default router;
