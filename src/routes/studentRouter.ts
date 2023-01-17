import { Router } from "express";
const { verifyToken,verifyTokenStudent } = require('../middlewares/jwtHandler');
import {
    createExcleStudent,
    getAllStudent,
    getStudentById,
    createOneStudent,
    getAllStudentByYear,
    updateStudent,
    getStudentByToken,
    getStudentByStudentId,
    updateStudentByStudentId,
    getsummarizeStudent
} from "../controller/studentController";

import {
  getAllStudentCompany,
  createStudentCompany,
  getStudentCompany,
} from '../controller/student_companyController';

const router = Router();

router.post("/",verifyToken, createExcleStudent);
router.post("/one",verifyToken, createOneStudent);
router.get("/",verifyToken ,getAllStudent);
router.get("/ById",verifyToken ,getStudentById);
router.get("/student_company",verifyToken, getAllStudentCompany);
router.post("/student_company",verifyToken, createStudentCompany);
router.get("/year",verifyToken, getAllStudentByYear);
router.put("/update/:id",verifyToken, updateStudent);
router.get("/company/ById",verifyToken, getStudentCompany);
router.get("/token",verifyTokenStudent, getStudentByToken);
router.get("/studentId", getStudentByStudentId);
router.put("/studentId", updateStudentByStudentId);
router.get("/summarize",verifyToken, getsummarizeStudent);



export default router;