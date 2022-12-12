import { Router } from 'express';
import { createAssignment, getAssignment,updateAssignment,deleteAssignment,getAssignmentAdmin } from '../controller/assignmentController';
const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/create', verifyToken, createAssignment);
router.get('/get', verifyToken, getAssignment);
router.put('/update', verifyToken, updateAssignment);
router.delete('/delete', verifyToken, deleteAssignment);
router.get('/getAdmin', verifyToken, getAssignmentAdmin);


export default router;
