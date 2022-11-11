import { Router } from 'express';
import {
  getFm10_21coop,
  getFm10_21detail,
  getquestionfm10_21,
  createFm10_20coop,
  createFm10_21point
} from '../controller/pointFm10_21Controller';

const router = Router();

router.get('/coop', getFm10_21coop);
router.get('/detail', getFm10_21detail);
router.get('/question', getquestionfm10_21);
router.post('/coop', createFm10_20coop);
router.post('/point', createFm10_21point);

export default router;
