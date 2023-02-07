import { Router } from 'express';
import { createForm,getAllForm,getFormById,updateform,deleteForm } from './../controller/formController';

const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post('/', verifyTokenAdmin, createForm);
router.get('/', verifyTokenAdmin, getAllForm);
router.get('/ById', verifyTokenAdmin, getFormById);
router.put('/',verifyTokenAdmin, updateform);
router.delete('/', verifyTokenAdmin, deleteForm);

export default router;
