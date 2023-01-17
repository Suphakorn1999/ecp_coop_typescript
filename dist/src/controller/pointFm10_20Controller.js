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
exports.updateFm10_20point = exports.createFm10_20coop = exports.createFm10_20point = exports.getquestionfm10_20 = exports.getFm10_20coop = exports.getFm10_20detail = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_20coopModel_1 = require("../models/fm10_20coopModel");
const answer10_20Model_1 = require("../models/answer10_20Model");
const questionModel_1 = require("../models/questionModel");
const getFm10_20detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm20 = yield config_1.default.query(`SELECT f.idfm10_20_coop,c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS FM10_20 
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_20 a ON f.idfm10_20_coop = a.idfm10_20_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 4 AND f.idstudent_company = ${req.query.idstudent_company} || f.idstudent_company IS NULL
    GROUP BY f.idfm10_20_coop,sc.idcompany
    `, { type: sequelize_1.QueryTypes.SELECT });
    fm20.forEach((fm20) => __awaiter(void 0, void 0, void 0, function* () {
        fm20.FM10_20 = JSON.parse(fm20.FM10_20);
    }));
    return res.status(200).json({
        message: 'Fm10_20point fetched successfully',
        data: fm20,
    });
});
exports.getFm10_20detail = getFm10_20detail;
const getFm10_20coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_20coop = yield config_1.default.query(`SELECT sc.idstudent_company,c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,s.prename_student,s.fname_student,s.lname_student,b.name_branch,y.term,y.year,f.total_score,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory`, { type: sequelize_1.QueryTypes.SELECT });
    return res
        .status(200)
        .json({ message: 'Fm10_20coop fetched successfully', data: fm10_20coop });
});
exports.getFm10_20coop = getFm10_20coop;
const getquestionfm10_20 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questionfm10_20 = yield questionModel_1.Question.findAll({ where: { idform: 4 } });
    return res.status(200).json({
        message: 'questionfm10_20 fetched successfully',
        data: questionfm10_20,
    });
});
exports.getquestionfm10_20 = getquestionfm10_20;
const createFm10_20point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_20;
    var idfm10_20_coop = jsondata.idfm10_20_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_20_coop, idquestion, answer, note });
    }
    const fm10_20coop = yield fm10_20coopModel_1.Fm10_20_coop.findAll({ where: { idfm10_20_coop: idfm10_20_coop } });
    if (fm10_20coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_20Model_1.Answerfm10_20.findAll({
            where: {
                idfm10_20_coop: values[i].idfm10_20_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_20Model_1.Answerfm10_20.create({
                    idfm10_20_coop: values[i].idfm10_20_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                    note: values[i].note,
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_20point created successfully' });
});
exports.createFm10_20point = createFm10_20point;
const createFm10_20coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allfm10_20 = yield fm10_20coopModel_1.Fm10_20_coop.findAll({ where: { idstudent_company: req.body.idstudent_company } });
    if (Allfm10_20.length > 0) {
        return res.status(400).json({ message: 'Fm10_20coop already exists' });
    }
    else {
        const fm10_20coop = yield fm10_20coopModel_1.Fm10_20_coop.create(Object.assign({}, req.body));
        return res.status(200).json({ message: 'Fm10_20coop created successfully', data: fm10_20coop });
    }
});
exports.createFm10_20coop = createFm10_20coop;
const updateFm10_20point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_20;
    var idfm10_20_coop = jsondata.idfm10_20_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_20_coop, idquestion, answer, note });
    }
    const fm10_20coop = yield fm10_20coopModel_1.Fm10_20_coop.findAll({ where: { idfm10_20_coop: idfm10_20_coop } });
    if (fm10_20coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_20Model_1.Answerfm10_20.findAll({
            where: {
                idfm10_20_coop: values[i].idfm10_20_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_20Model_1.Answerfm10_20.create({
                    idfm10_20_coop: values[i].idfm10_20_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                    note: values[i].note,
                });
            }
            else {
                yield answer10_20Model_1.Answerfm10_20.update({
                    answer: values[i].answer,
                    note: values[i].note,
                }, {
                    where: {
                        idfm10_20_coop: values[i].idfm10_20_coop,
                        idquestion: values[i].idquestion,
                    },
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_20point updated successfully' });
});
exports.updateFm10_20point = updateFm10_20point;
