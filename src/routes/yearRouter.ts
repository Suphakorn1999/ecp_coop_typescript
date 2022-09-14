import { Router } from 'express';

import { createYear, getAllYear } from '../controller/yearController';


const router = Router();

router.post('/', createYear);
router.get('/', getAllYear);

export default router;