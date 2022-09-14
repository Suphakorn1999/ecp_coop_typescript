import { Router } from 'express';
import {createFactory,getAllFactory } from '../controller/factoryController';


const router = Router();

router.post('/', createFactory);
router.get('/', getAllFactory);

export default router;