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
exports.getquestionfm10_20 = exports.createFm10_20 = exports.getFm10_20coop = exports.getFm10_20detail = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_20coopModel_1 = require("../models/fm10_20coopModel");
const questionModel_1 = require("../models/questionModel");
const getFm10_20detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm20 = yield config_1.default.query(`SELECT c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",a.answer)),"]") AS FM10_20 
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON m.idmeeting = f.idmeeting
    LEFT JOIN answerfm10_20 a ON f.idfm10_20_coop = a.idfm10_20_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 4
    GROUP BY f.idfm10_20_coop
    `, { type: sequelize_1.QueryTypes.SELECT });
    fm20.forEach((fm20) => __awaiter(void 0, void 0, void 0, function* () {
        fm20.student = JSON.parse(fm20.student);
        fm20.FM10_20 = JSON.parse(fm20.FM10_20);
    }));
    return res.status(200).json({
        message: 'Fm10_20point fetched successfully',
        data: fm20,
    });
});
exports.getFm10_20detail = getFm10_20detail;
const getFm10_20coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_20coop = yield config_1.default.query(`SELECT m.idmeeting,c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON m.idmeeting = f.idmeeting
    LEFT JOIN answerfm10_20 a ON f.idfm10_20_coop = a.idfm10_20_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 4
    GROUP BY f.idfm10_20_coop`, { type: sequelize_1.QueryTypes.SELECT });
    fm10_20coop.forEach((fm10_20coop) => __awaiter(void 0, void 0, void 0, function* () {
        fm10_20coop.student = JSON.parse(fm10_20coop.student);
    }));
    return res
        .status(200)
        .json({ message: 'Fm10_14coop fetched successfully', data: fm10_20coop });
});
exports.getFm10_20coop = getFm10_20coop;
const createFm10_20 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const All = yield fm10_20coopModel_1.Fm10_20_coop.findAll({
        where: { idstudent: req.body.idmeeting },
    });
    if (All.length > 0) {
        const fm10_20coop = yield fm10_20coopModel_1.Fm10_20_coop.update(Object.assign({}, req.body), { where: { idstudent: req.body.idmeeting } });
        return res.status(200).json({
            message: 'Fm10_20coop updated successfully',
            data: fm10_20coop,
        });
    }
    else {
        const fm10_20coop = yield fm10_20coopModel_1.Fm10_20_coop.create(Object.assign({}, req.body));
        return res.status(200).json({
            message: 'Fm10_20coop created successfully',
            data: fm10_20coop,
        });
    }
});
exports.createFm10_20 = createFm10_20;
const getquestionfm10_20 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questionfm10_20 = yield questionModel_1.Question.findAll({ where: { idform: 4 } });
    return res.status(200).json({
        message: 'questionfm10_20 fetched successfully',
        data: questionfm10_20,
    });
});
exports.getquestionfm10_20 = getquestionfm10_20;
