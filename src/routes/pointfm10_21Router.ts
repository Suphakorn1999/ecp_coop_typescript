import { Router } from 'express';
import {
  getFm10_21coop,
  getFm10_21detail,
  getquestionfm10_21,
  createFm10_21coop,
  createFm10_21point,
  updateFm10_21point,
  getFm10_21detailadmin,
  getFm10_21coopBytoken
} from '../controller/pointFm10_21Controller';
const { verifyToken, verifyTokenStudent, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();

router.get('/coop',verifyToken, getFm10_21coop);
router.get('/detail',verifyTokenStudent, getFm10_21detail);
router.get('/question',verifyToken,getquestionfm10_21);
router.post('/coop', verifyTokenStudent, createFm10_21coop);
router.post('/point', verifyTokenStudent, createFm10_21point);
router.put('/point',verifyToken, updateFm10_21point);
router.get('/detailadmin', verifyTokenAdmin, getFm10_21detailadmin);
router.get('/coopbytoken',verifyTokenStudent, getFm10_21coopBytoken);


export default router;
