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
exports.updateFm10_13coop = exports.updateFM10_13point = exports.getquestionfm10_13 = exports.createFm10_13point = exports.createFm10_13coop = exports.getFm10_13totalpoint = exports.getFm10_13coop = exports.getFm10_13detail = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_13coopModel_1 = require("../models/fm10_13coopModel");
const answer10_13Model_1 = require("../models/answer10_13Model");
const questionModel_1 = require("../models/questionModel");
const getFm10_13detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm13 = yield config_1.default.query(`SELECT f.idfm10_13_coop,fm.name_form,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,f.report_title_th,f.report_title_en,f.other_Comments,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS point
    FROM student s
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_13_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN form fm ON fm.idform = f.idform
    LEFT JOIN branch b ON b.idbranch = s.idbranch
    LEFT JOIN factory fa ON fa.idfactory = b.idfactory
    LEFT JOIN company c ON c.idcompany = sc.idcompany
    LEFT JOIN answerfm10_13 a ON a.idfm10_13_coop = f.idfm10_13_coop
    LEFT JOIN question q ON q.idquestion = a.idquestion
    WHERE q.idform = 6 AND f.idstudent_company = ${req.query.idstudent_company}
    GROUP BY f.idfm10_13_coop`, { type: sequelize_1.QueryTypes.SELECT });
    fm13.forEach((element) => {
        element.point = JSON.parse(element.point);
    });
    return res
        .status(200)
        .json({
        message: 'Fm10_13detail fetched successfully',
        data: fm13,
    });
});
exports.getFm10_13detail = getFm10_13detail;
const getFm10_13coop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm13 = yield config_1.default.query(`SELECT f.idfm10_13_coop,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,f.report_title_th,f.report_title_en,f.other_Comments,f.updatedAt
    FROM student s
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN company c ON c.idcompany = sc.idcompany
    LEFT JOIN branch b ON b.idbranch = s.idbranch
    LEFT JOIN factory fa ON fa.idfactory = b.idfactory
    LEFT JOIN year y ON y.idyear = s.idyear
    LEFT JOIN fm10_13_coop f ON sc.idstudent_company = f.idstudent_company
    ORDER BY f.idfm10_13_coop DESC
    `, { type: sequelize_1.QueryTypes.SELECT });
    return res
        .status(200)
        .json({
        message: 'Fm10_13coop fetched successfully',
        data: fm13,
    });
});
exports.getFm10_13coop = getFm10_13coop;
const getFm10_13totalpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_13coop = yield config_1.default.query(`SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,f.name_factory,
      c.name_company,fm.fname_assessor,fm.lname_assessor,fm.position_assessor,
      fm.department_assessor,fm.report_title_th,fm.report_title_en,fm.other_Comments,fm.createdAt,fm.updatedAt,
      SUM(a.answer) AS point
      FROM student_company sc 
      LEFT JOIN student s ON sc.idstudent = s.idstudent 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN year y ON s.idyear = y.idyear 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN fm10_13_coop fm ON sc.idstudent_company = fm.idstudent_company 
      LEFT JOIN answerfm10_13 a ON fm.idfm10_13_coop = a.idfm10_13_coop
      LEFT JOIN question q ON a.idquestion = q.idquestion
      LEFT JOIN form fom ON q.idform = fom.idform
      where q.count_question = 'yes'
      AND q.idform = 6
      GROUP BY sc.idstudent_company`, { type: sequelize_1.QueryTypes.SELECT });
    return res.status(200).json({ message: 'Fm10_13totalpoint fetched successfully', data: fm10_13coop });
});
exports.getFm10_13totalpoint = getFm10_13totalpoint;
const createFm10_13coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allfm10_13 = yield fm10_13coopModel_1.Fm10_13_coop.findAll({ where: { idstudent_company: req.body.idstudent_company } });
    if (Allfm10_13.length > 0) {
        return res.status(400).json({ message: 'Fm10_13coop already exists' });
    }
    else {
        const create = yield fm10_13coopModel_1.Fm10_13_coop.create(Object.assign({}, req.body));
        return res.status(200).json({ message: 'Fm10_13coop created successfully', data: create });
    }
});
exports.createFm10_13coop = createFm10_13coop;
const createFm10_13point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_13;
    var idfm10_13_coop = jsondata.idfm10_13_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_13_coop, idquestion, answer });
    }
    const fm10_13coop = yield fm10_13coopModel_1.Fm10_13_coop.findAll({ where: { idfm10_13_coop: idfm10_13_coop } });
    if (fm10_13coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_13coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_13Model_1.Answerfm10_13.findAll({
            where: {
                idfm10_13_coop: values[i].idfm10_13_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_13Model_1.Answerfm10_13.create({
                    idfm10_13_coop: values[i].idfm10_13_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                });
            }
            else {
                return res.status(400).json({ message: 'Answerfm10_13 already exists' });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_13point created successfully' });
});
exports.createFm10_13point = createFm10_13point;
const getquestionfm10_13 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questionfm10_13 = yield questionModel_1.Question.findAll({ where: { idform: 6 } });
    return res.status(200).json({ message: 'questionfm10_13 fetched successfully', data: questionfm10_13 });
});
exports.getquestionfm10_13 = getquestionfm10_13;
const updateFM10_13point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_13;
    var idfm10_13_coop = jsondata.idfm10_13_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_13_coop, idquestion, answer });
    }
    const fm10_13coop = yield fm10_13coopModel_1.Fm10_13_coop.findAll({ where: { idfm10_13_coop: idfm10_13_coop } });
    if (fm10_13coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_13coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_13Model_1.Answerfm10_13.findAll({
            where: {
                idfm10_13_coop: values[i].idfm10_13_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                return res.status(400).json({ message: 'Answerfm10_13 not found' });
            }
            else {
                yield answer10_13Model_1.Answerfm10_13.update({
                    answer: values[i].answer,
                }, {
                    where: {
                        idfm10_13_coop: values[i].idfm10_13_coop,
                        idquestion: values[i].idquestion,
                    }
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_13point updated successfully' });
});
exports.updateFM10_13point = updateFM10_13point;
const updateFm10_13coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_13coop = yield fm10_13coopModel_1.Fm10_13_coop.findAll({ where: { idfm10_13_coop: req.query.idfm10_13_coop } });
    if (fm10_13coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_13coop not found' });
    }
    yield fm10_13coopModel_1.Fm10_13_coop.update(Object.assign({}, req.body), {
        where: {
            idfm10_13_coop: req.query.idfm10_13_coop
        }
    });
    return res.status(200).json({ message: 'Fm10_13coop updated successfully' });
});
exports.updateFm10_13coop = updateFm10_13coop;
