import { Router } from 'express';
import {  getFile,deleteFile } from '../controller/fileController';
const { verifyTokenStudent } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/',verifyTokenStudent, getFile);
router.delete('/',verifyTokenStudent, deleteFile);

export default router;
