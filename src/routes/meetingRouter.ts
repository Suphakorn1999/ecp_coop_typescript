import { Router } from 'express';

import { createMeeting, getMeeting } from '../controller/meetingController';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();


router.post('/', createMeeting);
router.get('/',verifyToken, getMeeting);


export default router;