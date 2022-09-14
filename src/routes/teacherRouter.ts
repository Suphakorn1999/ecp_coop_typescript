import { Router } from 'express';

import {
  createTeacher,
  getAllTeacher,
  updateTeacher,
} from '../controller/teacherController';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/', createTeacher);
router.get('/',verifyToken, getAllTeacher);
router.post('/update', updateTeacher);

export default router;
