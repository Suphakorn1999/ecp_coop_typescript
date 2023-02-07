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
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');
const router = Router();


router.get('/question', verifyTokenAdmin, getquestion10_18);
router.get('/detail',verifyTokenAdmin, getFm10_18detail);
router.get('/coop',verifyTokenAdmin, getFm10_18coop);
router.post('/coop',verifyTokenAdmin, createFm10_18coop);
router.post('/point', verifyTokenAdmin, createFm10_18point);
router.put('/coop',verifyTokenAdmin, updateFm10_18coop);
router.put('/point', verifyTokenAdmin, updateFm10_18point);




export default router;



