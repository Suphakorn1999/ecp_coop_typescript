import { Router } from 'express';

import {
  createTeacher,
  getAllTeacher,
  updateTeacher,
} from '../controller/teacherController';
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/', verifyTokenAdmin, createTeacher);
router.get('/', verifyTokenAdmin, getAllTeacher);
router.post('/update', verifyTokenAdmin ,updateTeacher);

export default router;
