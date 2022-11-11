import { Router } from 'express';
import {
  getquestion10_18,
  getFm10_18detail,
  getFm10_18coop,
  createFm10_18coop,
  createFm10_18point
} from '../controller/pointFm10_18Controller';

const router = Router();


router.get('/question', getquestion10_18);
router.get('/detail', getFm10_18detail);
router.get('/coop', getFm10_18coop);
router.post('/coop', createFm10_18coop);
router.post('/point', createFm10_18point);





export default router;



