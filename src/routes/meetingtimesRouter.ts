import { Router } from 'express';
import { createMeetingTimes, updateMeetingTimes, getMeetingTimes } from './../controller/meetingtimesController';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();

router.post('/', verifyToken, createMeetingTimes);
router.put('/', verifyToken, updateMeetingTimes);
router.get('/', verifyToken, getMeetingTimes);

export default router;