import { Router } from 'express';
import {
    createQualification,
    updateQualification,
} from '../controller/qualificationController';

const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/',verifyToken, createQualification);
router.put('/',verifyToken, updateQualification);

export default router;
