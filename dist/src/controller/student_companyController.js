"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentCompany = exports.getAllStudentCompany = exports.createStudentCompany = void 0;
const student_companyModel_1 = require("../models/student_companyModel");
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const YearModel_1 = require("../models/YearModel");
const createStudentCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const All3 = yield student_companyModel_1.Student_Company.findAll({ where: { idstudent: req.body.idstudent } });
    if (All3.length > 0) {
        const update = yield student_companyModel_1.Student_Company.update({ idcompany: req.body.idcompany }, { where: { idstudent: req.body.idstudent } });
        res.status(200).json({
            message: 'Student Company Updated',
            update: update,
        });
    }
    else {
        const student_company = yield student_companyModel_1.Student_Company.create(Object.assign({}, req.body));
        if (student_company) {
            return res
                .status(200)
                .json({ message: 'Student Company created successfully' });
        }
    }
});
exports.createStudentCompany = createStudentCompany;
const getAllStudentCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const idyear = req.query.idyear;
    if (idyear === undefined && search_name === '') {
        const year = yield YearModel_1.Year.findAll({ where: { status_year: 'yes' } });
        const student_company = yield config_1.default.query(`SELECT s.idstudent,c.idcompany,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,c.name_company 
      FROM student s 
      LEFT JOIN student_company st ON s.idstudent = st.idstudent 
      LEFT JOIN company c ON st.idcompany = c.idcompany 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear
      where (s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%' or c.name_company like '%${search_name}%') and y.idyear = ${year[0].idyear}
      ORDER BY y.year ASC, y.term ASC,s.idstudent ASC
      limit ${limit} offset ${offset}
      `, { type: sequelize_1.QueryTypes.SELECT });
        return res.status(200).json({
            message: 'Student Companies fetched successfully',
            data: student_company,
        });
    }
    else if (idyear != undefined) {
        const student_company = yield config_1.default.query(`SELECT s.idstudent,c.idcompany,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,c.name_company 
      FROM student s 
      LEFT JOIN student_company st ON s.idstudent = st.idstudent 
      LEFT JOIN company c ON st.idcompany = c.idcompany 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear
      where (s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%' or c.name_company like '%${search_name}%' ) and y.idyear = ${idyear}
      ORDER BY y.year ASC, y.term ASC,s.idstudent ASC
      limit ${limit} offset ${offset}
      `, { type: sequelize_1.QueryTypes.SELECT });
        return res.status(200).json({
            message: 'Student Companies fetched successfully',
            data: student_company,
        });
    }
    else if (search_name != '' && idyear === undefined) {
        const student_company = yield config_1.default.query(`SELECT s.idstudent,c.idcompany,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,c.name_company 
      FROM student s 
      LEFT JOIN student_company st ON s.idstudent = st.idstudent 
      LEFT JOIN company c ON st.idcompany = c.idcompany 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear
      where s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%' or c.name_company like '%${search_name}%'
      ORDER BY y.year ASC, y.term ASC,s.idstudent ASC
      limit ${limit} offset ${offset}
      `, { type: sequelize_1.QueryTypes.SELECT });
        return res.status(200).json({
            message: 'Student Companies fetched successfully',
            data: student_company,
        });
    }
});
exports.getAllStudentCompany = getAllStudentCompany;
const getStudentCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield config_1.default.query(`SELECT 
      CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student,"term",y.term,"year",y.year)),"]") AS STUDENT
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear
      where c.idcompany = ${req.query.id}
      GROUP BY sc.idcompany
      `, { type: sequelize_1.QueryTypes.SELECT });
    student.forEach((item) => {
        item.STUDENT = JSON.parse(item.STUDENT);
    });
    return res
        .status(200)
        .json({ message: 'Meeting fetched successfully', data: student });
});
exports.getStudentCompany = getStudentCompany;
