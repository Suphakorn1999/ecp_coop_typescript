import { Router } from 'express';
import {
    getFm10_11_coop,
    getquestionfm10_11_part1,
    getquestionfm10_11_part2
} from '../controller/pointFm10_11Controller';

const router = Router();

router.get('/coop', getFm10_11_coop);
router.get('/question', getquestionfm10_11_part1);
router.get('/question2', getquestionfm10_11_part2);



export default router;
