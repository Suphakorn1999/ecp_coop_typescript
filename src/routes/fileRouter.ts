import { Router } from 'express';
import {  getFile } from '../controller/fileController';
const { verifyTokenStudent } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/',verifyTokenStudent, getFile);

export default router;
