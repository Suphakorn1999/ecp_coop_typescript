import { Router } from 'express';
import {
    getFm10_11_coop,
    getquestionfm10_11_part1,
    getquestionfm10_11_part2,
    createFm10_11_coop,
    createFm10_11_point,
    updateFm10_11_coop,
    updateFm10_11point,
    getFm10_11_detailpart1,
    getFm10_11_detailpart2,
    getFm10_11_coopAdmin
} from '../controller/pointFm10_11Controller';
const { verifyToken, verifyTokenTeacher, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();

router.get('/coop', verifyTokenTeacher, getFm10_11_coop);
router.get('/question',verifyToken, getquestionfm10_11_part1);
router.get('/question2',verifyToken, getquestionfm10_11_part2);
router.post('/coop',verifyToken, createFm10_11_coop);
router.post('/point',verifyToken, createFm10_11_point);
router.put('/coop',verifyToken, updateFm10_11_coop);
router.put('/point',verifyToken, updateFm10_11point);
router.get('/detail',verifyToken, getFm10_11_detailpart1);
router.get('/detail2',verifyToken, getFm10_11_detailpart2);
router.get('/coopadmin', verifyTokenAdmin, getFm10_11_coopAdmin);

export default router;
