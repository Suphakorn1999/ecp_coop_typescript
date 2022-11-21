import { Router } from 'express';
import {
  getquestion10_18,
  getFm10_18detail,
  getFm10_18coop,
  createFm10_18coop,
  createFm10_18point,
  updateFm10_18coop,
  updateFm10_18point,
} from '../controller/pointFm10_18Controller';
const { verifyToken } = require('../middlewares/jwtHandler');
const router = Router();


router.get('/question',verifyToken, getquestion10_18);
router.get('/detail',verifyToken, getFm10_18detail);
router.get('/coop',verifyToken, getFm10_18coop);
router.post('/coop',verifyToken, createFm10_18coop);
router.post('/point',verifyToken, createFm10_18point);
router.put('/coop',verifyToken, updateFm10_18coop);
router.put('/point',verifyToken, updateFm10_18point);



export default router;



