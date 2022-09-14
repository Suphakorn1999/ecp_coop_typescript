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
exports.login = void 0;
const branchModel_1 = require("./../models/branchModel");
const studentModel_1 = require("../models/studentModel");
const { generateToken } = require('../middlewares/jwtHandler');
const XmlRpcService = require('../services/xmlrpc');
const dotenv_1 = __importDefault(require("dotenv"));
const roleModel_1 = require("../models/roleModel");
const teacherModel_1 = require("../models/teacherModel");
dotenv_1.default.config();
const CryptoJS = require('crypto-js');
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let attribs = req.query.attribs;
    attribs = XmlRpcService.decryptxml(attribs);
    attribs.then((data) => __awaiter(void 0, void 0, void 0, function* () {
        data = JSON.stringify(data);
        data = JSON.parse(data);
        data = data.replaceAll("'", '"');
        data = JSON.parse(data);
        if (data.title[0] == 'Students') {
            let idrole = 0;
            let idbranch = 0;
            const role = yield roleModel_1.Role.findAll({ where: { name: data.title[0] } });
            if (role.length > 0) {
                idrole = role[0].idrole;
            }
            let name_branch = data.program[0].split(' ')[1];
            const branch = yield branchModel_1.Branch.findAll({
                where: { name_branch: name_branch },
            });
            if (branch.length > 0) {
                idbranch = branch[0].idbranch;
            }
            const student = yield studentModel_1.Student.findAll({
                where: { username_student: data.uid[0] },
            });
            if (student.length > 0) {
                let encodeId = CryptoJS.AES.encrypt(data.studentId[0], process.env.secretKey).toString();
                let token = generateToken({
                    id: student[0].idstudent,
                    studentId: encodeId,
                });
                res.redirect(`http://localhost:3000/gettoken?token=${token}`);
            }
            else {
                const student = yield studentModel_1.Student.create({
                    student_id: data.studentId[0],
                    prename_student: data.prename[0],
                    fname_student: data.firstNameThai[0],
                    lname_student: data.lastNameThai[0],
                    username_student: data.uid[0],
                    idrole: idrole,
                    idbranch: idbranch,
                });
                let encodeId = CryptoJS.AES.encrypt(data.studentId[0], process.env.secretKey).toString();
                let token = generateToken({ id: student.idstudent, studentId: encodeId });
                res.redirect(`http://localhost:3000/gettoken?token=${token}`);
            }
        }
        else if (data.title[0] == 'Teachers') {
            let idrole = 0;
            let idbranch = 0;
            const role = yield roleModel_1.Role.findAll({ where: { name: data.title[0] } });
            if (role.length > 0) {
                idrole = role[0].idrole;
            }
            let name_branch = data.program[0].replace('สาขาวิชา', '');
            const branch = yield branchModel_1.Branch.findAll({
                where: { name_branch: name_branch },
            });
            if (branch.length > 0) {
                idbranch = branch[0].idbranch;
            }
            const teacher = yield teacherModel_1.Teacher.findAll({
                where: { username_teacher: data.uid[0] },
            });
            if (teacher.length > 0) {
                let token = generateToken({ id: teacher[0].idteacher });
                res.redirect(`http://localhost:3000/gettoken?token=${token}`);
            }
            else {
                yield teacherModel_1.Teacher.create({
                    prename_teacher: data.prename[0],
                    firstname_teacher: data.firstNameThai[0],
                    lastname_teacher: data.lastNameThai[0],
                    username_teacher: data.uid[0],
                    idrole: idrole || null,
                    idbranch: idbranch || null,
                });
                let token = generateToken({ id: data.uid[0] });
                res.redirect(`http://localhost:3000/gettoken?token=${token}`);
            }
        }
    }));
});
exports.login = login;
