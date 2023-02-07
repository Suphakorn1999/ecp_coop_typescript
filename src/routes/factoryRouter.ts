import { Router } from 'express';
import {createFactory,getAllFactory } from '../controller/factoryController';
const { verifyToken, verifyTokenTeacher, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', verifyTokenAdmin, createFactory);
router.get('/', verifyTokenAdmin, getAllFactory);

export default router;