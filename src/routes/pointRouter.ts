import { Router } from 'express';
import {
  getFm10_14detail,
  getFm10_14coop,
  getFm10_14totalpoint,
  createFm10_14coop,
  createFm10_14point,
  getquestionfm10_14,
  updateFM10_14point,
  updateFm10_14coop
} from '../controller/pointFm10_14Controller';
const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/detail',verifyToken,getFm10_14detail);
router.get('/coop',verifyToken,getFm10_14coop);
router.get('/totalpoint',verifyToken,getFm10_14totalpoint);
router.post('/coop',verifyToken, createFm10_14coop);
router.post('/point',verifyToken, createFm10_14point);
router.get('/question',verifyToken, getquestionfm10_14);
router.put('/point',verifyToken, updateFM10_14point);
router.put('/coop',verifyToken, updateFm10_14coop);



export default router;