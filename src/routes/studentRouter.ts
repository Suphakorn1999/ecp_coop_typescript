import { Router } from "express";
const { verifyToken,verifyTokenStudent } = require('../middlewares/jwtHandler');
import {
    createExcleStudent,
    getAllStudent,
    getStudentById,
    createOneStudent,
    getAllStudentByYear,
    updateStudent,
    getStudentByToken
} from "../controller/studentController";

import {
  getAllStudentCompany,
  createStudentCompany,
  getStudentCompany,
} from '../controller/student_companyController';

const router = Router();

router.post("/", createExcleStudent);
router.post("/one",verifyToken, createOneStudent);
router.get("/",verifyToken ,getAllStudent);
router.get("/ById",verifyToken ,getStudentById);
router.get("/student_company",verifyToken, getAllStudentCompany);
router.post("/student_company", createStudentCompany);
router.get("/year", getAllStudentByYear);
router.put("/",verifyToken, updateStudent);
router.get("/company/ById",verifyToken, getStudentCompany);
router.get("/token",verifyTokenStudent, getStudentByToken);



export default router;