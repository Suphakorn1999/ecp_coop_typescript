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
exports.updateStudentByStudentId = exports.getStudentByStudentId = exports.getStudentByToken = exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudentByYear = exports.getAllStudent = exports.createOneStudent = exports.createExcleStudent = void 0;
const studentModel_1 = require("../models/studentModel");
const YearModel_1 = require("../models/YearModel");
const branchModel_1 = require("../models/branchModel");
const factoryModel_1 = require("../models/factoryModel");
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const study_groupModel_1 = require("../models/study_groupModel");
const createExcleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.data;
    const yearId = yield YearModel_1.Year.findAll({ where: { year: dataStudent.year, term: dataStudent.term } });
    const branchId = yield branchModel_1.Branch.findAll({ where: { name_branch: dataStudent.branch } });
    const study_groupId = yield study_groupModel_1.Study_group.findAll({ where: { name_study_group: dataStudent.study_group } });
    for (var i = 0; i < dataStudent.length; i++) {
        let studentID = dataStudent[i].studentID;
        let idrole = 1;
        let preName = dataStudent[i].prename_student ? dataStudent[i].prename_student.replaceAll(" ", "") : null;
        let fName = dataStudent[i].firstNameThai ? dataStudent[i].firstNameThai.replaceAll(" ", "") : null;
        let lName = dataStudent[i].lastNameThai ? dataStudent[i].lastNameThai.replaceAll(" ", "") : null;
        let year = yearId[0].idyear;
        let Id_branch = branchId[0].idbranch;
        let Id_study_group = study_groupId[0].idstudy_group;
        values.push({ studentID, idrole, preName, fName, lName, year, Id_branch, Id_study_group });
    }
    values.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
        yield studentModel_1.Student.findAll({
            where: {
                student_id: e.studentID
            }
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield studentModel_1.Student.create({ e });
            }
        }));
    }));
    return res
        .status(200)
        .json({ message: 'Students created successfully' });
});
exports.createExcleStudent = createExcleStudent;
const createOneStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.idrole = 1;
    let term = req.body.year.split('/')[0];
    let year = req.body.year.split('/')[1];
    const yearId = yield YearModel_1.Year.findAll({ where: { year: year, term: term } });
    const branchId = yield branchModel_1.Branch.findAll({
        where: { name_branch: req.body.branch },
    });
    if (yearId.length > 0) {
        req.body.idyear = yearId[0].idyear;
    }
    else {
        return res.status(400).json({ message: 'Year not found' });
    }
    const Allstudent = yield studentModel_1.Student.findAll({ where: { student_id: req.body.student_id, idyear: req.body.idyear } });
    if (Allstudent.length > 0) {
        return res.status(400).json({ message: 'StudentId is already exist' });
    }
    if (branchId.length > 0) {
        req.body.idbranch = branchId[0].idbranch;
    }
    const student = yield studentModel_1.Student.create(Object.assign({}, req.body));
    if (student) {
        return res
            .status(200)
            .json({ message: 'Student created successfully', data: student });
    }
});
exports.createOneStudent = createOneStudent;
const getAllStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const students = yield config_1.default.query(`SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,
      CONCAT(y.term,"/",y.year) AS year,sg.name_study_group,b.name_branch,f.name_factory,s.status 
      FROM student s 
      LEFT JOIN year y ON s.idyear = y.idyear 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN study_group sg ON s.idstudy_group = sg.idstudy_group
      where s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%'
      limit ${limit} offset ${offset}`, { type: sequelize_1.QueryTypes.SELECT });
    return res
        .status(200)
        .json({ message: 'Students fetched successfully', data: students });
});
exports.getAllStudent = getAllStudent;
const getAllStudentByYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.idyear;
    if (!id) {
        return res.status(400).json({ message: 'idyear is required' });
    }
    const students = yield studentModel_1.Student.findAll({ where: { idyear: id } });
    return res
        .status(200)
        .json({ message: 'Students fetched successfully', data: students });
});
exports.getAllStudentByYear = getAllStudentByYear;
const getStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const students = yield studentModel_1.Student.findByPk(id, { include: [{ model: YearModel_1.Year }, { model: branchModel_1.Branch, include: [{ model: factoryModel_1.Factory }] }, { model: study_groupModel_1.Study_group }], attributes: ['idstudent', 'student_id', 'prename_student', 'fname_student', 'lname_student', 'status'] });
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
});
exports.getStudentById = getStudentById;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const student = yield studentModel_1.Student.findAll({ where: { idstudent: id } });
    if (student.length > 0) {
        yield studentModel_1.Student.update(Object.assign({}, req
            .body), { where: { idstudent: id } });
        return res
            .status(200)
            .json({ message: 'Student updated successfully' });
    }
    else {
        return res.status(400).json({ message: 'Student not found' });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const students = yield studentModel_1.Student.findByPk(id);
    if (students) {
        yield studentModel_1.Student.destroy({ where: { idstudent: id } });
        return res
            .status(200)
            .json({ message: 'Student deleted successfully', data: students });
    }
    else {
        return res
            .status(400)
            .json({ message: 'Student not found' });
    }
});
exports.deleteStudent = deleteStudent;
const getStudentByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.id;
    const students = yield studentModel_1.Student.findByPk(id, { attributes: ['prename_student', 'fname_student', 'lname_student', 'status'] });
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
});
exports.getStudentByToken = getStudentByToken;
const getStudentByStudentId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.StudentId;
    const students = yield studentModel_1.Student.findOne({ where: { student_id: id }, include: [{ model: YearModel_1.Year }, { model: branchModel_1.Branch, include: [{ model: factoryModel_1.Factory }] }, { model: study_groupModel_1.Study_group }], attributes: ['idstudent', 'student_id', 'prename_student', 'fname_student', 'lname_student', 'status'] });
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
});
exports.getStudentByStudentId = getStudentByStudentId;
const updateStudentByStudentId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.StudentId;
    const student = yield studentModel_1.Student.findOne({ where: { student_id: id } });
    if (!student) {
        return res.status(400).json({ message: 'Student not found' });
    }
    const updatedStudent = yield student.update({
        idrole: 1,
        idbranch: req.body.idbranch,
        username_student: req.body.username_student,
    });
    return res
        .status(200)
        .json({ message: 'Student updated successfully', data: updatedStudent });
});
exports.updateStudentByStudentId = updateStudentByStudentId;
