import { Router } from 'express';

import {
  createProvince,
  getAllProvince,
} from '../controller/provinceController';

const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', verifyTokenAdmin, createProvince);
router.get('/', getAllProvince);

export default router;
