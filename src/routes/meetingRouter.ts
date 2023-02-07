import { Router } from 'express';

import { createMeeting, getMeeting, getMeetingById,updateMeeting,deleteMeeting } from '../controller/meetingController';
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();


router.post('/', verifyTokenAdmin,createMeeting);
router.get('/', verifyTokenAdmin, getMeeting);
router.get('/:id', verifyTokenAdmin, getMeetingById);
router.put('/:id',verifyTokenAdmin, updateMeeting);
router.delete('/:id',verifyTokenAdmin, deleteMeeting);


export default router;