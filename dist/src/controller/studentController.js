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
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudentByYear = exports.getAllStudent = exports.createOneStudent = exports.createExcleStudent = void 0;
const studentModel_1 = require("../models/studentModel");
const YearModel_1 = require("../models/YearModel");
const branchModel_1 = require("../models/branchModel");
const factoryModel_1 = require("../models/factoryModel");
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const createExcleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    console.log(jsondata);
    return;
    var values = [];
    var dataStudent = jsondata.data;
    for (var i = 0; i < dataStudent.length; i++) {
        if (typeof dataStudent[i].studentId != "number") {
            return res.status(400).json({ message: 'StudentId is not a number' });
        }
        let studentid = dataStudent[i].studentId;
        let firstNameThai = dataStudent[i].firstNameThai ? dataStudent[i].firstNameThai.replaceAll(" ", "") : null;
        let lastNameThai = dataStudent[i].lastNameThai ? dataStudent[i].lastNameThai.replaceAll(" ", "") : null;
        values.push([studentid, firstNameThai, lastNameThai]);
    }
    for (var i = 0; i < values.length; i++) {
        yield studentModel_1.Student.create(values[i]);
    }
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
    const students = yield config_1.default.query('SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,CONCAT(y.term,"/",y.year) AS year,b.name_branch,f.name_factory,s.status FROM student s LEFT JOIN year y ON s.idyear = y.idyear LEFT JOIN branch b ON s.idbranch = b.idbranch LEFT JOIN factory f ON b.idfactory = f.idfactory', { type: sequelize_1.QueryTypes.SELECT });
    // const students = await Student.findAll({include : [{model: Year},{model: Branch,include : [{model: Factory}]}]});
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
    const students = yield studentModel_1.Student.findByPk(id, { include: [{ model: YearModel_1.Year }, { model: branchModel_1.Branch, include: [{ model: factoryModel_1.Factory }] }], attributes: ['student_id', 'prename_student', 'fname_student', 'lname_student', 'status'] });
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
});
exports.getStudentById = getStudentById;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const student = yield studentModel_1.Student.findByPk(id);
    if (!student) {
        return res.status(400).json({ message: 'Student not found' });
    }
    const updatedStudent = yield student.update(req.body);
    return res
        .status(200)
        .json({ message: 'Student updated successfully', data: updatedStudent });
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
