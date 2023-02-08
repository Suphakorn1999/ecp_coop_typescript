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
const studentModel_1 = require("../models/studentModel");
const { generateToken } = require('../middlewares/jwtHandler');
const XmlRpcService = require('../services/xmlrpc');
const dotenv_1 = __importDefault(require("dotenv"));
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
            const student = yield studentModel_1.Student.findAll({
                where: { username_student: data.uid[0] },
            });
            if (student.length > 0) {
                let encodeId = CryptoJS.AES.encrypt(data.studentId[0], process.env.secretKey).toString();
                let encodeuser = CryptoJS.AES.encrypt(data.uid[0], process.env.secretKey).toString();
                let token = generateToken({
                    id: student[0].idstudent,
                    studentId: encodeId,
                    username_student: encodeuser
                });
                res.redirect(`https://ecp-coop.ddns.net/gettoken?token=${token}`);
            }
            else {
                res.redirect(`https://ecp-coop.ddns.net/register?id=${data.studentId[0]}&username_student=${data.uid[0]}`);
            }
        }
        else if (data.title[0] == 'Teachers') {
            const teacher = yield teacherModel_1.Teacher.findAll({
                where: { username_teacher: data.uid[0] },
            });
            if (teacher.length > 0) {
                let encodeuser = CryptoJS.AES.encrypt(data.uid[0], process.env.secretKey).toString();
                let token = generateToken({
                    id: teacher[0].idteacher,
                    username_teacher: encodeuser
                });
                res.redirect(`https://teacher-ecpcoop.ddns.net/gettoken?token=${token}`);
            }
            else {
                res.redirect(`https://teacher-ecpcoop.ddns.net/login`);
            }
        }
    }));
});
exports.login = login;
