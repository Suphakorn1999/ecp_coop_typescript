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
exports.updateFm10_21point = exports.createFm10_21coop = exports.createFm10_21point = exports.getquestionfm10_21 = exports.getFm10_21detailadmin = exports.getFm10_21detail = exports.getFm10_21coop = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_21coopModel_1 = require("../models/fm10_21coopModel");
const answer10_21Model_1 = require("../models/answer10_21Model");
const getFm10_21coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm21 = yield config_1.default.query(`SELECT sc.idstudent_company,s.prename_student, s.fname_student, s.lname_student,s.student_id,y.term,y.year,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee,f.createdAt,f.updatedAt
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory`, { type: sequelize_1.QueryTypes.SELECT });
    return res.status(200).json({
        message: 'Fm10_21point fetched successfully',
        data: fm21,
    });
});
exports.getFm10_21coop = getFm10_21coop;
const getFm10_21detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.id;
    const fm21 = yield config_1.default.query(`SELECT f.idfm10_21_coop,an.idfm10_21_coop,s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN answerfm10_21 an ON f.idfm10_21_coop = an.idfm10_21_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        where fm.idform = 5 AND f.idstudent = ${id}
        GROUP BY f.idfm10_21_coop`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    const question = (idfm10_21_coop, idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT an.idfm10_21_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question,"point",an.answer,"note",an.note)ORDER BY q.idquestion ASC),"]") AS FM10_21
      FROM answerfm10_21 an
      LEFT JOIN fm10_21_coop f ON an.idfm10_21_coop = f.idfm10_21_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where an.idfm10_21_coop = ${idfm10_21_coop} AND q.idsub_question = ${idquestion}
      GROUP BY an.idfm10_21_coop`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm21_2 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 5 AND (q.idquestion = 31 OR q.idquestion = 38 OR q.idquestion = 45)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    fm21.forEach((e) => {
        e.HEADER = fm21_2;
    });
    for (let i of fm21) {
        for (let h of i.HEADER) {
            h.FM10_21 = (yield question(i.idfm10_21_coop, h.idquestion))[0];
            h.FM10_21 = JSON.parse(h.FM10_21.FM10_21);
        }
    }
    return res.status(200).json({
        message: 'Fm10_21point fetched successfully',
        data: fm21,
    });
});
exports.getFm10_21detail = getFm10_21detail;
const getFm10_21detailadmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fm21 = yield config_1.default.query(`SELECT f.idfm10_21_coop,an.idfm10_21_coop,s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN answerfm10_21 an ON f.idfm10_21_coop = an.idfm10_21_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        where fm.idform = 5 AND f.idstudent = ${req.query.idstudent}
        GROUP BY f.idfm10_21_coop`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    const question = (idfm10_21_coop, idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT an.idfm10_21_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question,"point",an.answer,"note",an.note)ORDER BY q.idquestion ASC),"]") AS FM10_21
      FROM answerfm10_21 an
      LEFT JOIN fm10_21_coop f ON an.idfm10_21_coop = f.idfm10_21_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where an.idfm10_21_coop = ${idfm10_21_coop} AND q.idsub_question = ${idquestion}
      GROUP BY an.idfm10_21_coop`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm21_2 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 5 AND (q.idquestion = 31 OR q.idquestion = 38 OR q.idquestion = 45)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    fm21.forEach((e) => {
        e.HEADER = fm21_2;
    });
    for (let i of fm21) {
        for (let h of i.HEADER) {
            h.FM10_21 = (yield question(i.idfm10_21_coop, h.idquestion))[0];
            h.FM10_21 = JSON.parse(h.FM10_21.FM10_21);
        }
    }
    return res.status(200).json({
        message: 'Fm10_21point fetched successfully',
        data: fm21,
    });
});
exports.getFm10_21detailadmin = getFm10_21detailadmin;
const getquestionfm10_21 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const question = (idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT an.idfm10_21_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question)ORDER BY q.idquestion ASC),"]") AS FM10_21
      FROM answerfm10_21 an
      LEFT JOIN fm10_21_coop f ON an.idfm10_21_coop = f.idfm10_21_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where q.idsub_question = ${idquestion}
      GROUP BY an.idfm10_21_coop`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm21_2 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 5 AND (q.idquestion = 31 OR q.idquestion = 38 OR q.idquestion = 45)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    for (let h of fm21_2) {
        h.FM10_21 = (yield question(h.idquestion))[0];
        h.FM10_21 = JSON.parse(h.FM10_21.FM10_21);
    }
    return res.status(200).json({
        message: 'Fm10_21_question fetched successfully',
        data: fm21_2,
    });
});
exports.getquestionfm10_21 = getquestionfm10_21;
const createFm10_21point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_21;
    var idfm10_21_coop = jsondata.idfm10_21_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_21_coop, idquestion, answer, note });
    }
    const fm10_21coop = yield fm10_21coopModel_1.Fm10_21_coop.findAll({ where: { idfm10_21_coop: idfm10_21_coop } });
    if (fm10_21coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_21coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_21Model_1.Answerfm10_21.findAll({
            where: {
                idfm10_21_coop: values[i].idfm10_21_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_21Model_1.Answerfm10_21.create({
                    idfm10_21_coop: values[i].idfm10_21_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                    note: values[i].note,
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_21point created successfully' });
});
exports.createFm10_21point = createFm10_21point;
const createFm10_21coop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.id;
    const Allfm10_21 = yield fm10_21coopModel_1.Fm10_21_coop.findAll({ where: { idstudent: id } });
    if (Allfm10_21.length > 0) {
        return res.status(400).json({ message: 'Fm10_21coop already exists' });
    }
    else {
        const fm10_21coop = yield fm10_21coopModel_1.Fm10_21_coop.create(Object.assign(Object.assign({}, req.body), { idstudent: id }));
        return res.status(200).json({ message: 'Fm10_20coop created successfully', data: fm10_21coop });
    }
});
exports.createFm10_21coop = createFm10_21coop;
const updateFm10_21point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_21;
    var idfm10_21_coop = jsondata.idfm10_21_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_21_coop, idquestion, answer, note });
    }
    const fm10_21coop = yield fm10_21coopModel_1.Fm10_21_coop.findAll({ where: { idfm10_21_coop: idfm10_21_coop } });
    if (fm10_21coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_21coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_21Model_1.Answerfm10_21.findAll({
            where: {
                idfm10_21_coop: values[i].idfm10_21_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_21Model_1.Answerfm10_21.create({
                    idfm10_21_coop: values[i].idfm10_21_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                    note: values[i].note,
                });
            }
            else {
                yield answer10_21Model_1.Answerfm10_21.update({
                    answer: values[i].answer,
                    note: values[i].note,
                }, {
                    where: {
                        idfm10_21_coop: values[i].idfm10_21_coop,
                        idquestion: values[i].idquestion,
                    }
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_21point updated successfully' });
});
exports.updateFm10_21point = updateFm10_21point;
