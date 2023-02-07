import { Router } from "express";
const { verifyToken, verifyTokenStudent, verifyTokenAdmin } = require('../middlewares/jwtHandler');
import { createStudy_group, getStudy_group, getStudy_groupById, updateStudy_group,deleteStudy_group } from '../controller/study_groupController';
const router = Router();

router.post('/', verifyTokenAdmin, createStudy_group);
router.get('/', verifyTokenAdmin, getStudy_group);
router.get('/:id', verifyTokenAdmin, getStudy_groupById);
router.post('/update/:id', verifyTokenAdmin, updateStudy_group);
router.post('/delete/:id', verifyTokenAdmin, deleteStudy_group);

export default router;



