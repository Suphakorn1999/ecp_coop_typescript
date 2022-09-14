import { Router } from 'express';
import {
  getFm10_14detail,
  getFm10_14coop,
  getFm10_14totalpoint,
  createFm10_14coop,
  createFm10_14point,
  getquestionfm10_14,
} from '../controller/pointFm10_14Controller';

const router = Router();

router.get('/detail', getFm10_14detail);
router.get('/coop', getFm10_14coop);
router.get('/totalpoint', getFm10_14totalpoint);
router.post('/coop', createFm10_14coop);
router.post('/point', createFm10_14point);
router.get('/question', getquestionfm10_14);


export default router;