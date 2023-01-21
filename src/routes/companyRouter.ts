import { Router } from 'express';
const { verifyToken, verifyTokenTeacher } = require('../middlewares/jwtHandler');
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

router.post('/', createCompany);
router.get('/',verifyToken, getAllCompany);
router.get('/student', getAllCompany);

router.get('/ById',verifyToken, getCompanyById);
router.put('/ById',verifyToken, updateCompanyById);

router.delete('/ById',verifyToken, deleteCompanyById);
router.post('/createQualification',verifyToken, createQualification);
router.put('/updateQualification',verifyToken, updateQualification);
router.get('/companyByidteacher', verifyTokenTeacher, companyByidteacher);



export default router;