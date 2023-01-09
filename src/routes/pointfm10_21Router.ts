import { Router } from 'express';
import {
  getFm10_21coop,
  getFm10_21detail,
  getquestionfm10_21,
  createFm10_21coop,
  createFm10_21point,
  updateFm10_21point,
  getFm10_21detailadmin
} from '../controller/pointFm10_21Controller';
const { verifyToken,verifyTokenStudent } = require('../middlewares/jwtHandler');
const router = Router();

router.get('/coop',verifyToken, getFm10_21coop);
router.get('/detail',verifyTokenStudent, getFm10_21detail);
router.get('/question',verifyToken,getquestionfm10_21);
router.post('/coop',verifyTokenStudent, createFm10_21coop);
router.post('/point',verifyToken, createFm10_21point);
router.put('/point',verifyToken, updateFm10_21point);
router.get('/detailadmin',verifyToken, getFm10_21detailadmin);


export default router;
