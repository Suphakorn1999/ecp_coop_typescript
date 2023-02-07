import { Router } from 'express';
import {
    createQualification,
    updateQualification,
} from '../controller/qualificationController';

const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', verifyTokenAdmin, createQualification);
router.put('/', verifyTokenAdmin, updateQualification);

export default router;
