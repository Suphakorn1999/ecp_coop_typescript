import { Router } from "express";
const { verifyToken,verifyTokenStudent } = require('../middlewares/jwtHandler');
import { createStudy_group, getStudy_group, getStudy_groupById, updateStudy_group,deleteStudy_group } from '../controller/study_groupController';
const router = Router();

router.post('/',verifyToken, createStudy_group);
router.get('/', verifyToken, getStudy_group);
router.get('/:id', verifyToken, getStudy_groupById);
router.post('/update/:id', verifyToken, updateStudy_group);
router.post('/delete/:id', verifyToken, deleteStudy_group);

export default router;



