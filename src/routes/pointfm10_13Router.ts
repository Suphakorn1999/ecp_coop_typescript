import { Router } from 'express';
import { getFm10_13detail, getFm10_13coop, getFm10_13totalpoint, createFm10_13coop, createFm10_13point, getquestionfm10_13,
    updateFM10_13point, updateFm10_13coop, getFm10_13coopBytokenteacher, updateFm10_13cooptotal, getFm10_13coopByidfile, getFm10_13detailAdmin } from '../controller/pointFm10_13Controller';
const { verifyToken, verifyTokenTeacher, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/detail',verifyToken,getFm10_13detail);
router.get('/coop',verifyToken,getFm10_13coop);
router.get('/totalpoint',verifyToken,getFm10_13totalpoint);
router.post('/coop',verifyToken,createFm10_13coop);
router.post('/point',verifyToken,createFm10_13point);
router.get('/question',verifyToken,getquestionfm10_13);
router.put('/point',verifyToken,updateFM10_13point);
router.put('/coop',verifyToken,updateFm10_13coop);
router.get('/coopbyteacher', verifyTokenTeacher,getFm10_13coopBytokenteacher);
router.put('/cooptotal', verifyTokenTeacher,updateFm10_13cooptotal);
router.get('/coopbyidfile', verifyToken,getFm10_13coopByidfile);
router.get('/detailadmin', verifyTokenAdmin,getFm10_13detailAdmin);


export default router;