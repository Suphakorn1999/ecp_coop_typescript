import { Router } from 'express';
import { getFile, deleteFile, getFileformadmin, getFileformadminbyid, updateStatusFile, getfileByidstudent, getfileByidassignment } from '../controller/fileController';
const { verifyTokenStudent, verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.get('/',verifyTokenStudent, getFile);
router.delete('/',verifyTokenStudent, deleteFile);
router.get('/admin', verifyTokenAdmin,getFileformadmin);
router.get('/adminByid', verifyTokenAdmin,getFileformadminbyid);
router.put('/updateStatus', verifyTokenAdmin,updateStatusFile);
router.get('/getfileByidstudent', verifyTokenAdmin,getfileByidstudent);
router.get('/getfileByidassignment', verifyTokenAdmin,getfileByidassignment);

export default router;
