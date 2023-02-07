import { Router } from 'express';
import {
  getFm10_14detail,
  getFm10_14coop,
  createFm10_14coop,
  createFm10_14point,
  getquestionfm10_14,
  updateFM10_14point,
  updateFm10_14coop
} from '../controller/pointFm10_14Controller';
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/detail', verifyTokenAdmin,getFm10_14detail);
router.get('/coop',verifyTokenAdmin,getFm10_14coop);
router.post('/coop',verifyTokenAdmin, createFm10_14coop);
router.post('/point',verifyTokenAdmin, createFm10_14point);
router.get('/question',verifyTokenAdmin, getquestionfm10_14);
router.put('/point',verifyTokenAdmin, updateFM10_14point);
router.put('/coop', verifyTokenAdmin, updateFm10_14coop);



export default router;