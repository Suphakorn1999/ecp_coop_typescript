import { Router } from 'express';

import {
    createRole
} from '../controller/roleController';

const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', createRole);

export default router;
