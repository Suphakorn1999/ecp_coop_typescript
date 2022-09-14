import { Router } from 'express';

import {login} from '../controller/loginController';


const router = Router();

router.get('/',login);

export default router;
