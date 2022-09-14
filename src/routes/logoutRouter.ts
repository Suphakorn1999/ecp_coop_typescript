import { Router } from 'express';

import { logout } from './../controller/logoutController';

const router = Router();

router.get('/', logout);

export default router;
