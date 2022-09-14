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
exports.getFm10_18coop = exports.getFm10_18detail = exports.getquestion10_18 = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const questionModel_1 = require("../models/questionModel");
const getquestion10_18 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const question10_18 = yield questionModel_1.Question.findAll({ where: { idform: 3 } });
    return res
        .status(200)
        .json({
        message: 'question fetched successfully',
        data: question10_18,
    });
});
exports.getquestion10_18 = getquestion10_18;
const getFm10_18detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm18 = yield config_1.default.query(`SELECT 
    (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student,
    c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.createdAt,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",a.answer)),"]") AS FM10_18
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_18 a ON f.idfm10_18_coop = a.idfm10_18_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 3
    GROUP BY f.idfm10_18_coop
    `, { type: sequelize_1.QueryTypes.SELECT });
    fm18.forEach((fm18) => __awaiter(void 0, void 0, void 0, function* () {
        fm18.student = JSON.parse(fm18.student);
        fm18.FM10_18 = JSON.parse(fm18.FM10_18);
    }));
    return res.status(200).json({
        message: 'Fm10_20point fetched successfully',
        data: fm18,
    });
});
exports.getFm10_18detail = getFm10_18detail;
const getFm10_18coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_18coop = yield config_1.default.query(`SELECT (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student,
    c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_18 a ON f.idfm10_18_coop = a.idfm10_18_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 3
    GROUP BY sc.idstudent_company`, { type: sequelize_1.QueryTypes.SELECT });
    fm10_18coop.forEach((fm10_18coop) => __awaiter(void 0, void 0, void 0, function* () {
        fm10_18coop.student = JSON.parse(fm10_18coop.student);
    }));
    return res
        .status(200)
        .json({ message: 'Fm10_14coop fetched successfully', data: fm10_18coop });
});
exports.getFm10_18coop = getFm10_18coop;
