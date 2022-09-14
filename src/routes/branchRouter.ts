import { Router } from 'express';
import { createBranch, getAllBranch,updateBranch,deleteBranch } from '../controller/branchController';


const router = Router();

router.post('/', createBranch);
router.put('/', updateBranch);
router.delete('/', deleteBranch);
router.get('/', getAllBranch);

export default router;
