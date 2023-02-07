import { Router } from "express";
const { verifyToken, verifyTokenStudent, verifyTokenAdmin } = require('../middlewares/jwtHandler');
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
    getsummarizeStudent,
    updateStatusfile,
    updateGrade
} from "../controller/studentController";

import {
  getAllStudentCompany,
  createStudentCompany,
  getStudentCompany,
} from '../controller/student_companyController';

const router = Router();

router.post("/", verifyTokenAdmin, createExcleStudent);
router.post("/one", verifyTokenAdmin, createOneStudent);
router.get("/", verifyTokenAdmin ,getAllStudent);
router.get("/ById", verifyTokenAdmin ,getStudentById);
router.get("/student_company",verifyToken, getAllStudentCompany);
router.post("/student_company", verifyTokenAdmin, createStudentCompany);
router.get("/year",verifyToken, getAllStudentByYear);
router.put("/update/:id", verifyTokenAdmin, updateStudent);
router.get("/company/ById",verifyToken, getStudentCompany);
router.get("/token",verifyTokenStudent, getStudentByToken);
router.get("/studentId", getStudentByStudentId);
router.put("/studentId", updateStudentByStudentId);
router.get("/summarize", verifyTokenAdmin, getsummarizeStudent);
router.put("/updateStatusfile",verifyTokenAdmin, updateStatusfile);
router.put("/updateGrade", verifyTokenAdmin, updateGrade);



export default router;