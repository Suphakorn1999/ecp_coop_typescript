import { Router } from 'express';

import {
    createRole
} from '../controller/roleController';

const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', verifyTokenAdmin, createRole);

export default router;
