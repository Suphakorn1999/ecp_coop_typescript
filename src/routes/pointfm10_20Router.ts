import { Router } from 'express';
import {
  getFm10_20detail,
  getFm10_20coop,
  getquestionfm10_20,
  createFm10_20point,
  createFm10_20coop,
  updateFm10_20point,
  updateFm1_20coop
} from '../controller/pointFm10_20Controller';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();


router.get('/detail',verifyToken, getFm10_20detail);
router.get('/coop',verifyToken, getFm10_20coop);
router.get('/question',verifyToken, getquestionfm10_20);
router.post('/point',verifyToken, createFm10_20point);
router.post('/coop',verifyToken, createFm10_20coop);
router.put('/point',verifyToken, updateFm10_20point);
router.put('/coop',verifyToken, updateFm1_20coop);

export default router;
