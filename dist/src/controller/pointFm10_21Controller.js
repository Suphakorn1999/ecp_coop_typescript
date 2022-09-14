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
exports.getFm10_21detail = exports.getFm10_21coop = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const getFm10_21coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm21 = yield config_1.default.query(`SELECT s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idqualification = qu.idqualification
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        GROUP BY f.idfm10_21_coop
        `, { type: sequelize_1.QueryTypes.SELECT });
    return res.status(200).json({
        message: 'Fm10_21point fetched successfully',
        data: fm21,
    });
});
exports.getFm10_21coop = getFm10_21coop;
const getFm10_21detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm21 = yield config_1.default.query(`SELECT s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee,
        (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",an.answer)),"]") AS FM20_21_1 FROM question q where q.idsub_question = 31) AS FM10_21_1,
        (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",an.answer)),"]") AS FM20_21_2 FROM question q where q.idsub_question = 38) AS FM10_21_2,
        (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",an.answer)),"]") AS FM20_21_3 FROM question q where q.idsub_question = 45) AS FM10_21_3
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN answerfm10_21 an ON f.idfm10_21_coop = an.idfm10_21_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idqualification = qu.idqualification
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        where fm.idform = 5
        GROUP BY f.idfm10_21_coop`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    fm21.forEach((item) => {
        item.FM10_21_1 = JSON.parse(item.FM10_21_1);
        item.FM10_21_2 = JSON.parse(item.FM10_21_2);
        item.FM10_21_3 = JSON.parse(item.FM10_21_3);
    });
    return res.status(200).json({
        message: 'Fm10_21point fetched successfully',
        data: fm21,
    });
});
exports.getFm10_21detail = getFm10_21detail;
