import { Router } from 'express';

import {
  createTeacher,
  getAllTeacher,
  updateTeacher,
  getTeacher,
  updateAccess_rights,
  checkAccess_rights
} from '../controller/teacherController';
const { verifyToken, verifyTokenAdmin, verifyTokenTeacher, verifyTokenAccess_rights } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/', verifyTokenAdmin, createTeacher);
router.get('/', verifyTokenAdmin, getAllTeacher);
router.post('/update', verifyTokenAdmin ,updateTeacher);
router.get('/get', verifyTokenTeacher, getTeacher);
router.post('/update/access_rights', verifyTokenAdmin, updateAccess_rights);
router.get('/check/access_rights', verifyTokenAccess_rights, checkAccess_rights);



export default router;
