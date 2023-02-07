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
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();


router.get('/detail', verifyTokenAdmin, getFm10_20detail);
router.get('/coop', verifyTokenAdmin, getFm10_20coop);
router.get('/question', verifyTokenAdmin, getquestionfm10_20);
router.post('/point',verifyTokenAdmin, createFm10_20point);
router.post('/coop',verifyTokenAdmin, createFm10_20coop);
router.put('/point',verifyTokenAdmin, updateFm10_20point);
router.put('/coop',verifyTokenAdmin, updateFm1_20coop);

export default router;
