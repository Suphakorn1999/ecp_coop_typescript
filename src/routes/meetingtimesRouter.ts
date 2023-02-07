import { Router } from 'express';
import { createMeetingTimes, updateMeetingTimes, getMeetingTimes } from './../controller/meetingtimesController';
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/', verifyTokenAdmin, createMeetingTimes);
router.put('/', verifyTokenAdmin, updateMeetingTimes);
router.get('/', verifyTokenAdmin, getMeetingTimes);

export default router;