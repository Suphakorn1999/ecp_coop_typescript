import { Router } from 'express';

import { createMeeting, getMeeting, getMeetingById,updateMeeting,deleteMeeting } from '../controller/meetingController';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();


router.post('/', verifyToken,createMeeting);
router.get('/',verifyToken, getMeeting);
router.get('/:id',verifyToken, getMeetingById);
router.put('/:id',verifyToken, updateMeeting);
router.delete('/:id',verifyToken, deleteMeeting);


export default router;