import { Router } from "express";
import {
  createActivity,
  getAllActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
} from '../controller/activityController';
import {
  createActivityStudent,
  updateActivityStudent,
  deleteActivityStudent,
  getActivityStudent,
} from '../controller/activity_studentController';

import {verifyActivity} from '../validation/verify';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/',verifyToken, createActivity);
router.get('/', verifyToken, getAllActivity);
router.get('/ById', verifyToken, getActivityById);
router.put('/', verifyToken, verifyActivity, updateActivity);
router.delete('/', verifyToken, verifyActivity, deleteActivity);


router.post('/createActivity',verifyToken, createActivityStudent);
router.put('/updateActivity', verifyToken, updateActivityStudent);
router.delete('/deleteActivity', verifyToken, deleteActivityStudent);
router.get('/getActivityStudent',verifyToken ,getActivityStudent);

export default router;

