import { Router } from 'express';
import {
  getFm10_20detail,
  getFm10_20coop,
  getquestionfm10_20,
  createFm10_20point,
  createFm10_20coop
} from '../controller/pointFm10_20Controller';

const router = Router();


router.get('/detail', getFm10_20detail);
router.get('/coop', getFm10_20coop);
router.get('/question', getquestionfm10_20);
router.post('/point', createFm10_20point);
router.post('/coop', createFm10_20coop);

export default router;
