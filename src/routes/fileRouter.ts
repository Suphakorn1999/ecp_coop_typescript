import { Router } from 'express';
import {  getFile,deleteFile,getFileformadmin,getFileformadminbyid } from '../controller/fileController';
const { verifyTokenStudent,verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/',verifyTokenStudent, getFile);
router.delete('/',verifyTokenStudent, deleteFile);
router.get('/admin',verifyToken,getFileformadmin);
router.get('/adminByid',verifyToken,getFileformadminbyid);

export default router;
