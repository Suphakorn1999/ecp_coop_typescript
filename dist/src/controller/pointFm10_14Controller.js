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
exports.getquestionfm10_14 = exports.createFm10_14point = exports.createFm10_14coop = exports.getFm10_14totalpoint = exports.getFm10_14coop = exports.getFm10_14detail = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_14coopModel_1 = require("../models/fm10_14coopModel");
const answerModel_1 = require("../models/answerModel");
const questionModel_1 = require("../models/questionModel");
const getFm10_14detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm14 = yield config_1.default.query(`SELECT fm.name_form,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",a.answer)),"]") AS point 
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_14_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_14 a ON f.idfm10_14_coop = a.idfm10_14_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 2
    GROUP BY f.idfm10_14_coop`, { type: sequelize_1.QueryTypes.SELECT });
    fm14.forEach((fm14) => __awaiter(void 0, void 0, void 0, function* () {
        fm14.point = JSON.parse(fm14.point);
    }));
    return res
        .status(200)
        .json({
        message: 'Fm10_14point fetched successfully',
        data: fm14,
    });
});
exports.getFm10_14detail = getFm10_14detail;
const getFm10_14coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_14coop = yield config_1.default.query(`SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,f.name_factory,
      c.name_company,fm.fname_assessor,fm.lname_assessor,fm.position_assessor,
      fm.department_assessor,fm.other_Comments,fm.createdAt,fm.updatedAt
      FROM student_company sc 
      LEFT JOIN student s ON sc.idstudent = s.idstudent 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN year y ON s.idyear = y.idyear 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN fm10_14_coop fm ON sc.idstudent_company = fm.idstudent_company 
      GROUP BY fm.idfm10_14_coop`, { type: sequelize_1.QueryTypes.SELECT });
    return res.status(200).json({ message: 'Fm10_14coop fetched successfully', data: fm10_14coop });
});
exports.getFm10_14coop = getFm10_14coop;
const getFm10_14totalpoint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_14coop = yield config_1.default.query(`SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,f.name_factory,
      c.name_company,fm.fname_assessor,fm.lname_assessor,fm.position_assessor,
      fm.department_assessor,fm.other_Comments,fm.createdAt,fm.updatedAt,
      SUM(a.answer) AS point
      FROM student_company sc 
      LEFT JOIN student s ON sc.idstudent = s.idstudent 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN year y ON s.idyear = y.idyear 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN fm10_14_coop fm ON sc.idstudent_company = fm.idstudent_company 
      LEFT JOIN answerfm10_14 a ON fm.idfm10_14_coop = a.idfm10_14_coop
      LEFT JOIN question q ON a.idquestion = q.idquestion
      LEFT JOIN form fom ON q.idform = fom.idform
      where q.count_question = 'yes'
      AND q.idform = 2
      GROUP BY sc.idstudent_company`, { type: sequelize_1.QueryTypes.SELECT });
    return res.status(200).json({ message: 'Fm10_14totalpoint fetched successfully', data: fm10_14coop });
});
exports.getFm10_14totalpoint = getFm10_14totalpoint;
const createFm10_14coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allfm10_14 = yield fm10_14coopModel_1.Fm10_14_coop.findAll({ where: { idstudent_company: req.body.idstudent_company } });
    if (Allfm10_14.length > 0) {
        const update = yield fm10_14coopModel_1.Fm10_14_coop.update(Object.assign({}, req.body), { where: { idstudent_company: req.body.idstudent_company } });
        return res.status(200).json({ message: 'Fm10_14coop updated successfully', data: update });
    }
    else {
        const create = yield fm10_14coopModel_1.Fm10_14_coop.create(Object.assign({}, req.body));
        return res.status(200).json({ message: 'Fm10_14coop created successfully', data: create });
    }
});
exports.createFm10_14coop = createFm10_14coop;
const createFm10_14point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_14;
    var idfm10_14_coop = jsondata.idfm10_14_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_14_coop, idquestion, answer });
    }
    const fm10_14coop = yield fm10_14coopModel_1.Fm10_14_coop.findAll({ where: { idstudent_company: idfm10_14_coop } });
    if (fm10_14coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_14coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answerModel_1.Answerfm10_14.findAll({
            where: {
                idfm10_14_coop: values[i].idfm10_14_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answerModel_1.Answerfm10_14.create({
                    idfm10_14_coop: values[i].idfm10_14_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                });
            }
            else {
                yield answerModel_1.Answerfm10_14.update({ answer: values[i].answer }, {
                    where: {
                        idfm10_14_coop: values[i].idfm10_14_coop,
                        idquestion: values[i].idquestion,
                    },
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_14point created Or updated successfully' });
});
exports.createFm10_14point = createFm10_14point;
const getquestionfm10_14 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questionfm10_14 = yield questionModel_1.Question.findAll({ where: { idform: 2 } });
    return res.status(200).json({ message: 'questionfm10_14 fetched successfully', data: questionfm10_14 });
});
exports.getquestionfm10_14 = getquestionfm10_14;
