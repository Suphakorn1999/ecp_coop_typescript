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
exports.deleteMeeting = exports.updateMeeting = exports.getMeetingById = exports.getMeeting = exports.createMeeting = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const meetingModel_1 = require("../models/meetingModel");
const createMeeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ALLmeeting = yield meetingModel_1.Meeting.findAll({
        where: {
            idstudent_company: req.body.idstudent_company,
            idteacher: req.body.idteacher,
        }
    });
    if (ALLmeeting.length > 0) {
        res.status(400).json({ message: 'Meeting already exists' });
    }
    else {
        const meeting = yield meetingModel_1.Meeting.create(Object.assign({}, req.body));
        if (meeting) {
            return res.status(200).json({ message: 'Meeting created successfully' });
        }
    }
});
exports.createMeeting = createMeeting;
const getMeeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const meeting = yield config_1.default.query(`SELECT m.idmeeting,sc.idstudent_company,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS student,
      y.term,y.year,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,c.name_company,p.name_province,m.name_project,m.startdate,m.enddate
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      WHERE s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%' OR t.firstname_teacher LIKE '%${search_name}%' OR t.lastname_teacher LIKE '%${search_name}%' 
      GROUP BY y.idyear
      limit ${limit} offset ${offset}
      `, { type: sequelize_1.QueryTypes.SELECT });
    meeting.forEach((item) => {
        item.student = JSON.parse(item.student);
    });
    return res
        .status(200)
        .json({ message: 'Meeting fetched successfully', data: meeting });
});
exports.getMeeting = getMeeting;
const getMeetingById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const meeting = yield config_1.default.query(`SELECT sc.idstudent_company,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS student,
      y.term,y.year,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,c.name_company,p.name_province,m.name_project,m.startdate,m.enddate
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      WHERE m.idmeeting = ${req.params.id}
      GROUP BY y.idyear`, { type: sequelize_1.QueryTypes.SELECT });
    meeting.forEach((item) => {
        item.student = JSON.parse(item.student);
    });
    return res
        .status(200)
        .json({ message: 'Meeting fetched successfully', data: meeting });
});
exports.getMeetingById = getMeetingById;
const updateMeeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const meeting = yield meetingModel_1.Meeting.update(Object.assign({}, req.body), { where: { idmeeting: req.params.id } });
    if (meeting) {
        return res.status(200).json({ message: 'Meeting updated successfully' });
    }
});
exports.updateMeeting = updateMeeting;
const deleteMeeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const meeting = yield meetingModel_1.Meeting.destroy({ where: { idmeeting: req.params.id } });
    if (meeting) {
        return res.status(200).json({ message: 'Meeting deleted successfully' });
    }
});
exports.deleteMeeting = deleteMeeting;
