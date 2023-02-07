import { Router } from 'express';
import { createAssignment, getAssignment,updateAssignment,deleteAssignment,getAssignmentAdmin } from '../controller/assignmentController';
const { verifyToken, verifyTokenStudent, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/create', verifyTokenAdmin, createAssignment);
router.get('/get', verifyTokenStudent, getAssignment);
router.put('/update', verifyTokenAdmin, updateAssignment);
router.delete('/delete', verifyTokenAdmin, deleteAssignment);
router.get('/getAdmin', verifyTokenAdmin, getAssignmentAdmin);


export default router;
