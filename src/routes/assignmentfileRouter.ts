import { Router } from 'express';
import { createAssignment, getAssignment,updateAssignment,deleteAssignment,getAssignmentAdmin } from '../controller/assignmentController';
const { verifyToken,verifyTokenStudent } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/create', verifyToken, createAssignment);
router.get('/get', verifyTokenStudent, getAssignment);
router.put('/update', verifyToken, updateAssignment);
router.delete('/delete', verifyToken, deleteAssignment);
router.get('/getAdmin', verifyToken, getAssignmentAdmin);


export default router;
