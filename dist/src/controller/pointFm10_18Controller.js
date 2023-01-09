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
exports.updateFm10_18point = exports.updateFm10_18coop = exports.createFm10_18coop = exports.createFm10_18point = exports.getFm10_18coop = exports.getFm10_18detail = exports.getquestion10_18 = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_18coopModel_1 = require("../models/fm10_18coopModel");
const answer10_18Model_1 = require("../models/answer10_18Model");
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
    const fm18 = yield config_1.default.query(`SELECT f.idfm10_18_coop,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,
    fa.name_factory,c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS FM10_18
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
    WHERE q.idform = 3 AND f.idstudent_company = ${req.query.idstudent_company}
    GROUP BY f.idfm10_18_coop 
    `, { type: sequelize_1.QueryTypes.SELECT });
    fm18.forEach((fm18) => __awaiter(void 0, void 0, void 0, function* () {
        fm18.FM10_18 = JSON.parse(fm18.FM10_18);
    }));
    return res.status(200).json({
        message: 'Fm10_18point fetched successfully',
        data: fm18,
    });
});
exports.getFm10_18detail = getFm10_18detail;
const getFm10_18coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_18coop = yield config_1.default.query(`SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,fa.name_factory,
    y.term,y.year,c.name_company,f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    `, { type: sequelize_1.QueryTypes.SELECT });
    fm10_18coop.forEach((fm10_18coop) => __awaiter(void 0, void 0, void 0, function* () {
        fm10_18coop.student = JSON.parse(fm10_18coop.student);
    }));
    return res
        .status(200)
        .json({ message: 'Fm10_18coop fetched successfully', data: fm10_18coop });
});
exports.getFm10_18coop = getFm10_18coop;
const createFm10_18point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_18;
    var idfm10_18_coop = jsondata.idfm10_18_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_18_coop, idquestion, answer });
    }
    const fm10_18coop = yield fm10_18coopModel_1.Fm10_18_coop.findAll({ where: { idfm10_18_coop: idfm10_18_coop } });
    if (fm10_18coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_18Model_1.Answerfm10_18.findAll({
            where: {
                idfm10_18_coop: values[i].idfm10_18_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_18Model_1.Answerfm10_18.create({
                    idfm10_18_coop: values[i].idfm10_18_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                });
            }
            else {
                return res.status(400).json({ message: 'Fm10_18point already exists' });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_18point created successfully' });
});
exports.createFm10_18point = createFm10_18point;
const createFm10_18coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allfm10_18 = yield fm10_18coopModel_1.Fm10_18_coop.findAll({ where: { idstudent_company: req.body.idstudent_company } });
    if (Allfm10_18.length > 0) {
        return res.status(400).json({ message: 'Fm10_18coop already exists' });
    }
    else {
        const fm10_18coop = yield fm10_18coopModel_1.Fm10_18_coop.create(Object.assign({}, req.body));
        return res.status(200).json({ message: 'Fm10_18coop created successfully', data: fm10_18coop });
    }
});
exports.createFm10_18coop = createFm10_18coop;
const updateFm10_18coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_18coop = yield fm10_18coopModel_1.Fm10_18_coop.findAll({ where: { idfm10_18_coop: req.query.idfm10_18_coop } });
    if (fm10_18coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_18coop not found' });
    }
    else {
        yield fm10_18coopModel_1.Fm10_18_coop.update(Object.assign({}, req.body), { where: { idfm10_18_coop: req.query.idfm10_18_coop } });
        return res.status(200).json({ message: 'Fm10_18coop updated successfully' });
    }
});
exports.updateFm10_18coop = updateFm10_18coop;
const updateFm10_18point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_18;
    var idfm10_18_coop = jsondata.idfm10_18_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_18_coop, idquestion, answer });
    }
    const fm10_18coop = yield fm10_18coopModel_1.Fm10_18_coop.findAll({ where: { idfm10_18_coop: idfm10_18_coop } });
    if (fm10_18coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_18Model_1.Answerfm10_18.findAll({
            where: {
                idfm10_18_coop: values[i].idfm10_18_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_18Model_1.Answerfm10_18.create({
                    idfm10_18_coop: values[i].idfm10_18_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                });
            }
            else {
                yield answer10_18Model_1.Answerfm10_18.update({ answer: values[i].answer }, { where: { idfm10_18_coop: values[i].idfm10_18_coop, idquestion: values[i].idquestion } });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_18point updated successfully' });
});
exports.updateFm10_18point = updateFm10_18point;
