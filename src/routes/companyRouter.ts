import { Router } from 'express';
const { verifyToken, verifyTokenTeacher, verifyTokenAdmin } = require('../middlewares/jwtHandler');
import { verify } from '../validation/verify';
import {
  createCompany,
  getAllCompany,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  createQualification,
  updateQualification,
  companyByidteacher
} from '../controller/companyController';

const router = Router();

router.post('/', verifyTokenAdmin, createCompany);
router.get('/', verifyTokenAdmin,getAllCompany);
router.get('/student', getAllCompany);

router.get('/ById', getCompanyById);
router.put('/ById', verifyTokenAdmin, updateCompanyById);

router.delete('/ById', verifyTokenAdmin, deleteCompanyById);
router.post('/createQualification', verifyTokenAdmin, createQualification);
router.put('/updateQualification', verifyTokenAdmin, updateQualification);
router.get('/companyByidteacher', verifyTokenTeacher, companyByidteacher);



export default router;