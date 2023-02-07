import { Router } from "express";
import {
  createActivity,
  getAllActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
  getAllActivityByYear,
  createActivityYear,
} from '../controller/activityController';
import {
  createActivityStudent,
  updateActivityStudent,
  deleteActivityStudent,
  getActivityStudent,
} from '../controller/activity_studentController';

import {verifyActivity} from '../validation/verify';
const { verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/', verifyTokenAdmin, createActivity);
router.get('/', verifyTokenAdmin, getAllActivity);
router.get('/ById', verifyTokenAdmin, getActivityById);
router.put('/', verifyTokenAdmin, verifyActivity, updateActivity);
router.delete('/', verifyTokenAdmin, verifyActivity, deleteActivity);
router.get('/ByYear', verifyTokenAdmin, getAllActivityByYear);
router.post('/createActivityYear', verifyTokenAdmin, createActivityYear);


router.post('/createActivity',verifyTokenAdmin, createActivityStudent);
router.put('/updateActivity', verifyTokenAdmin, updateActivityStudent);
router.delete('/deleteActivity', verifyTokenAdmin, deleteActivityStudent);
router.get('/getActivityStudent', verifyTokenAdmin ,getActivityStudent);

export default router;

