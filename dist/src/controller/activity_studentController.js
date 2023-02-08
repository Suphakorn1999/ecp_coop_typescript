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
exports.getActivityStudent = exports.deleteActivityStudent = exports.updateActivityStudent = exports.createActivityStudent = void 0;
const activity_studentModel_1 = require("../models/activity_studentModel");
const config_1 = __importDefault(require("../config/config"));
const Sequelize_1 = require("Sequelize");
const YearModel_1 = require("../models/YearModel");
const activity_yearModel_1 = require("../models/activity_yearModel");
const createActivityStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activity = yield activity_studentModel_1.Activity_Student.findAll({
        where: { idstudent: req.body.idstudent, idactivity: req.body.idactivity },
    });
    if (activity) {
        return res.status(400).json({ message: 'นักศึกษามีกิจกรรมนี้อยู่แล้ว' });
    }
    const activityStudent = yield activity_studentModel_1.Activity_Student.create(Object.assign({}, req.body));
    if (activityStudent) {
        return res.status(200).json({ message: 'Activity created successfully' });
    }
});
exports.createActivityStudent = createActivityStudent;
const updateActivityStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activity = yield activity_studentModel_1.Activity_Student.update(Object.assign({}, req.body), {
        where: {
            idstudent: req.body.idstudent,
            idactivity: req.body.idactivity,
        },
    });
    if (activity) {
        return res.status(200).json({ message: 'Activity updated successfully' });
    }
});
exports.updateActivityStudent = updateActivityStudent;
const deleteActivityStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activity = yield activity_studentModel_1.Activity_Student.destroy({
        where: { idactivity_student: req.body.id },
    });
    if (activity) {
        return res.status(200).json({ message: 'Activity deleted successfully' });
    }
});
exports.deleteActivityStudent = deleteActivityStudent;
const getActivityStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const year = yield YearModel_1.Year.findAll({ where: { status_year: 'yes' } });
    if (year.length > 0 && req.query.idyear == undefined) {
        const activity_year = yield activity_yearModel_1.Activity_Year.findAll({ where: { idyear: year[0].idyear } });
        if (activity_year.length > 0) {
            const activity_student = yield config_1.default.query(`SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,
        CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idactivity",a.idactivity,"name",a.name_activity,"status",ac.status_activity)ORDER BY a.idactivity ASC),"]") AS ACTIVITY 
        FROM student s 
        LEFT JOIN activity_student ac ON s.idstudent = ac.idstudent 
        LEFT JOIN activity a ON a.idactivity = ac.idactivity 
        LEFT JOIN enroll e ON s.idstudent = e.idstudent
        LEFT JOIN year y ON e.idyear = y.idyear
        LEFT JOIN activity_year ay ON ay.idactivity = a.idactivity
        WHERE (s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%') AND e.idyear = ${year[0].idyear}
        group by s.idstudent
        limit ${limit} offset ${offset}`, { type: Sequelize_1.QueryTypes.SELECT });
            activity_student.forEach((activity_student) => {
                activity_student.ACTIVITY = JSON.parse(activity_student.ACTIVITY);
            });
            return res.status(200).json({
                message: 'Activity Student fetched successfully',
                data: activity_student,
            });
        }
        else {
            return res.status(200).json({
                message: 'Activity Student fetched successfully',
                data: [],
            });
        }
    }
    else if (year.length > 0 && req.query.idyear != undefined) {
        const activity_year = yield activity_yearModel_1.Activity_Year.findAll({ where: { idyear: req.query.idyear } });
        if (activity_year.length > 0) {
            const activity_student = yield config_1.default.query(`SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,
        CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idactivity",a.idactivity,"name",a.name_activity,"status",ac.status_activity)ORDER BY a.idactivity ASC),"]") AS ACTIVITY 
        FROM student s 
        LEFT JOIN activity_student ac ON s.idstudent = ac.idstudent 
        LEFT JOIN activity a ON a.idactivity = ac.idactivity 
        LEFT JOIN enroll e ON e.idstudent = s.idstudent
        LEFT JOIN year y ON e.idyear = y.idyear
        LEFT JOIN activity_year ay ON ay.idactivity = a.idactivity AND ay.idyear = y.idyear
        WHERE (s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%') AND ay.idyear = ${req.query.idyear}
        group by s.idstudent
        limit ${limit} offset ${offset}
        `, { type: Sequelize_1.QueryTypes.SELECT });
            activity_student.forEach((activity_student) => {
                activity_student.ACTIVITY = JSON.parse(activity_student.ACTIVITY);
            });
            return res.status(200).json({
                message: 'Activity Student fetched successfully',
                data: activity_student,
            });
        }
        else {
            return res.status(200).json({
                message: 'Activity Student fetched successfully',
                data: [],
            });
        }
    }
});
exports.getActivityStudent = getActivityStudent;
