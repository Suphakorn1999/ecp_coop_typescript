import { Router } from 'express';
import { createBranch, getAllBranch,updateBranch,deleteBranch } from '../controller/branchController';
const { verifyToken, verifyTokenStudent, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', verifyTokenAdmin, createBranch);
router.put('/',verifyTokenAdmin, updateBranch);
router.delete('/', verifyTokenAdmin, deleteBranch);
router.get('/', getAllBranch);

export default router;
