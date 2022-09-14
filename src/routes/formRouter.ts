import { Router } from 'express';
import { createForm,getAllForm,getFormById,updateform,deleteForm } from './../controller/formController';

const { verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/',verifyToken, createForm);
router.get('/',verifyToken, getAllForm);
router.get('/ById',verifyToken, getFormById);
router.put('/',verifyToken, updateform);
router.delete('/',verifyToken, deleteForm);

export default router;
