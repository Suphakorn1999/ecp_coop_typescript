import { Router } from 'express';
import { createAssignment, getAssignment,updateAssignment,deleteAssignment } from '../controller/assignmentController';
const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/create', verifyToken, createAssignment);
router.get('/get', verifyToken, getAssignment);
router.put('/update', verifyToken, updateAssignment);
router.delete('/delete', verifyToken, deleteAssignment);


export default router;
