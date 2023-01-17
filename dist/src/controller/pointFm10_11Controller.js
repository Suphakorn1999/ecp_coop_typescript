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
exports.getFm10_11_detailpart2 = exports.getFm10_11_detailpart1 = exports.updateFm10_11point = exports.createFm10_11_point = exports.updateFm10_11_coop = exports.createFm10_11_coop = exports.getquestionfm10_11_part2 = exports.getquestionfm10_11_part1 = exports.getFm10_11_coop = void 0;
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
const fm10_11coopModel_1 = require("../models/fm10_11coopModel");
const answer10_11Model_1 = require("../models/answer10_11Model");
const getFm10_11_coop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idteacher = req.query.idteacher;
    if (idteacher == undefined) {
        const fm10_11coop = yield config_1.default.query(`SELECT s.idstudent,c.name_company,c.address,c.tel,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,fa.name_factory,f.time,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    LEFT JOIN province p ON c.idprovince = p.idprovince
    LEFT JOIN qualification q ON c.idcompany = q.idcompany
    `, { type: sequelize_1.QueryTypes.SELECT });
        return res
            .status(200)
            .json({ message: 'Fm10_11coop fetched successfully', data: fm10_11coop });
    }
    else {
        const fm10_11coop = yield config_1.default.query(`SELECT s.idstudent,c.name_company,c.address,c.tel,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,fa.name_factory,f.time,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    LEFT JOIN province p ON c.idprovince = p.idprovince
    LEFT JOIN qualification q ON c.idcompany = q.idcompany
    WHERE m.idteacher = ${idteacher}`, { type: sequelize_1.QueryTypes.SELECT });
        return res
            .status(200)
            .json({ message: 'Fm10_11coop fetched successfully', data: fm10_11coop });
    }
});
exports.getFm10_11_coop = getFm10_11_coop;
const getquestionfm10_11_part1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = (idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"id",q.idsub_question,"topic",q.name_question)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where q.idsub_question = ${idquestion}`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm11 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 53 OR q.idquestion = 57 OR q.idquestion = 64 OR q.idquestion = 66
      OR q.idquestion = 73 OR q.idquestion = 87)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    for (let h of fm11) {
        h.FM10_11 = (yield question(h.idquestion))[0];
        h.FM10_11 = JSON.parse(h.FM10_11.FM10_11);
    }
    return res
        .status(200)
        .json({ message: 'question fetched successfully', data: fm11 });
});
exports.getquestionfm10_11_part1 = getquestionfm10_11_part1;
const getquestionfm10_11_part2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const question = (idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"id",q.idsub_question,"topic",q.name_question)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where q.idsub_question = ${idquestion}`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm11 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 88 OR q.idquestion = 96 OR q.idquestion = 97 OR q.idquestion = 98
      OR q.idquestion = 99 OR q.idquestion = 100 OR q.idquestion = 104)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    for (let h of fm11) {
        h.FM10_11 = (yield question(h.idquestion))[0];
        h.FM10_11 = JSON.parse(h.FM10_11.FM10_11);
    }
    return res
        .status(200)
        .json({ message: 'question fetched successfully', data: fm11 });
});
exports.getquestionfm10_11_part2 = getquestionfm10_11_part2;
const createFm10_11_coop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_11coopALL = yield fm10_11coopModel_1.Fm10_11_coop.findAll({ where: { idstudent_company: req.body.idstudent_company } });
    if (fm10_11coopALL.length == 0) {
        const fm10_11coop = yield fm10_11coopModel_1.Fm10_11_coop.create(Object.assign(Object.assign({}, req.body), { time: 1 }));
        return res
            .status(201)
            .json({ message: 'Fm10_11coop created successfully', data: fm10_11coop });
    }
    else if (fm10_11coopALL.length == 1) {
        const fm10_11coop = yield fm10_11coopModel_1.Fm10_11_coop.create(Object.assign(Object.assign({}, req.body), { time: 2 }));
        return res
            .status(201)
            .json({ message: 'Fm10_11coop created successfully', data: fm10_11coop });
    }
    else if (fm10_11coopALL.length == 2) {
        return res
            .status(400)
            .json({ message: 'Fm10_11coop created fail', data: null });
    }
});
exports.createFm10_11_coop = createFm10_11_coop;
const updateFm10_11_coop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm10_11coop = yield fm10_11coopModel_1.Fm10_11_coop.findOne({ where: { idfm10_11_coop: req.body.idfm10_11_coop } });
    if (fm10_11coop) {
        const fm10_11coop = yield fm10_11coopModel_1.Fm10_11_coop.update(Object.assign({}, req.body), { where: { idfm10_11_coop: req.body.idfm10_11_coop } });
        return res
            .status(201)
            .json({ message: 'Fm10_11coop updated successfully', data: fm10_11coop });
    }
    else {
        return res
            .status(400)
            .json({ message: 'Fm10_11coop updated fail', data: null });
    }
});
exports.updateFm10_11_coop = updateFm10_11_coop;
const createFm10_11_point = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_11;
    var idfm10_11_coop = jsondata.idfm10_11_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_11_coop, idquestion, answer, note });
    }
    const fm10_11coop = yield fm10_11coopModel_1.Fm10_11_coop.findAll({ where: { idfm10_11_coop: idfm10_11_coop } });
    if (fm10_11coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_11coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_11Model_1.Answerfm10_11.findAll({
            where: {
                idfm10_11_coop: values[i].idfm10_11_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_11Model_1.Answerfm10_11.create({
                    idfm10_11_coop: values[i].idfm10_11_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                    note: values[i].note,
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_21point created successfully' });
});
exports.createFm10_11_point = createFm10_11_point;
const updateFm10_11point = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jsondata = req.body;
    var values = [];
    var dataStudent = jsondata.fm10_11;
    var idfm10_11_coop = jsondata.idfm10_11_coop;
    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_11_coop, idquestion, answer, note });
    }
    const fm10_11coop = yield fm10_11coopModel_1.Fm10_11_coop.findAll({ where: { idfm10_11_coop: idfm10_11_coop } });
    if (fm10_11coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_21coop not found' });
    }
    for (var i = 0; i < values.length; i++) {
        yield answer10_11Model_1.Answerfm10_11.findAll({
            where: {
                idfm10_11_coop: values[i].idfm10_11_coop,
                idquestion: values[i].idquestion,
            },
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.length == 0) {
                yield answer10_11Model_1.Answerfm10_11.create({
                    idfm10_11_coop: values[i].idfm10_11_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                    note: values[i].note,
                });
            }
            else {
                yield answer10_11Model_1.Answerfm10_11.update({
                    answer: values[i].answer,
                    note: values[i].note,
                }, {
                    where: {
                        idfm10_11_coop: values[i].idfm10_11_coop,
                        idquestion: values[i].idquestion,
                    }
                });
            }
        }));
    }
    return res.status(200).json({ message: 'Fm10_11point updated successfully' });
});
exports.updateFm10_11point = updateFm10_11point;
const getFm10_11_detailpart1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm11 = yield config_1.default.query(`SELECT f.idfm10_11_coop,an.idfm10_11_coop,
        c.name_company,c.name_company_eng,c.address,c.tel,p.name_province,
        s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, y.term, y.year,
        t.prename_teacher, t.firstname_teacher, t.lastname_teacher,f.createdAt,f.updatedAt
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
        LEFT JOIN answerfm10_11 an ON f.idfm10_11_coop = an.idfm10_11_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
        LEFT JOIN teacher t ON m.idteacher = t.idteacher
        where fm.idform = 1 AND s.idstudent = ${req.query.id} AND f.time = '${req.query.time}'
        GROUP BY f.idfm10_11_coop`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    const question = (idfm10_11_coop, idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT an.idfm10_11_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question,"point",an.answer,"note",an.note)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM answerfm10_11 an
      LEFT JOIN fm10_11_coop f ON an.idfm10_11_coop = f.idfm10_11_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where an.idfm10_11_coop = ${idfm10_11_coop} AND (q.idsub_question = ${idquestion} OR q.idquestion = ${idquestion})`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm11_1 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 53 OR q.idquestion = 57 OR q.idquestion = 64 OR q.idquestion = 66
      OR q.idquestion = 73 OR q.idquestion = 87)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    fm11.forEach((e) => {
        e.HEADER = fm11_1;
    });
    for (let i of fm11) {
        for (let h of i.HEADER) {
            h.FM10_11 = (yield question(i.idfm10_11_coop, h.idquestion))[0];
            h.FM10_11 = JSON.parse(h.FM10_11.FM10_11);
        }
    }
    return res
        .status(200)
        .json({ message: 'question fetched successfully', data: fm11 });
});
exports.getFm10_11_detailpart1 = getFm10_11_detailpart1;
const getFm10_11_detailpart2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fm11 = yield config_1.default.query(`SELECT f.idfm10_11_coop,an.idfm10_11_coop,
        c.name_company,c.name_company_eng,c.address,c.tel,p.name_province,
        s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, y.term, y.year,
        t.prename_teacher, t.firstname_teacher, t.lastname_teacher,f.createdAt,f.updatedAt
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
        LEFT JOIN answerfm10_11 an ON f.idfm10_11_coop = an.idfm10_11_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
        LEFT JOIN teacher t ON m.idteacher = t.idteacher
        where fm.idform = 1 AND s.idstudent = ${req.query.id} AND f.time = '${req.query.time}'
        GROUP BY f.idfm10_11_coop`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    const question = (idfm10_11_coop, idquestion) => __awaiter(void 0, void 0, void 0, function* () {
        return yield config_1.default.query(`SELECT an.idfm10_11_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question,"point",an.answer,"note",an.note)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM answerfm10_11 an
      LEFT JOIN fm10_11_coop f ON an.idfm10_11_coop = f.idfm10_11_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where an.idfm10_11_coop = ${idfm10_11_coop} AND (q.idsub_question = ${idquestion} OR q.idquestion = ${idquestion})`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
    });
    const fm11_1 = yield config_1.default.query(`SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 88 OR q.idquestion = 96 OR q.idquestion = 97 OR q.idquestion = 98
      OR q.idquestion = 99 OR q.idquestion = 100 OR q.idquestion = 104)
      GROUP BY q.idquestion
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    fm11.forEach((e) => {
        e.HEADER = fm11_1;
    });
    for (let i of fm11) {
        for (let h of i.HEADER) {
            h.FM10_11 = (yield question(i.idfm10_11_coop, h.idquestion))[0];
            h.FM10_11 = JSON.parse(h.FM10_11.FM10_11);
        }
    }
    return res
        .status(200)
        .json({ message: 'question fetched successfully', data: fm11 });
});
exports.getFm10_11_detailpart2 = getFm10_11_detailpart2;
