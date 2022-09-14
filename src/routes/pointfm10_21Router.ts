import { Router } from 'express';
import {
  getFm10_21coop,
  getFm10_21detail,
} from '../controller/pointFm10_21Controller';

const router = Router();

router.get('/coop', getFm10_21coop);
router.get('/detail', getFm10_21detail);

export default router;
