"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const companyModel_1 = require("../models/companyModel");
const provinceModel_1 = require("../models/provinceModel");
const studentModel_1 = require("../models/studentModel");
const activityModel_1 = require("../models/activityModel");
const activity_studentModel_1 = require("../models/activity_studentModel");
const fileModel_1 = require("../models/fileModel");
const teacherModel_1 = require("../models/teacherModel");
const student_companyModel_1 = require("../models/student_companyModel");
const meetingModel_1 = require("../models/meetingModel");
const YearModel_1 = require("../models/YearModel");
const factoryModel_1 = require("../models/factoryModel");
const branchModel_1 = require("../models/branchModel");
const fm10_14coopModel_1 = require("../models/fm10_14coopModel");
const adminModel_1 = require("../models/adminModel");
const roleModel_1 = require("../models/roleModel");
const qualificationModel_1 = require("../models/qualificationModel");
const fm10_20coopModel_1 = require("../models/fm10_20coopModel");
const formModel_1 = require("../models/formModel");
const questionModel_1 = require("../models/questionModel");
const answerModel_1 = require("../models/answerModel");
const answer10_20Model_1 = require("../models/answer10_20Model");
const fm10_18coopModel_1 = require("../models/fm10_18coopModel");
const answer10_18Model_1 = require("../models/answer10_18Model");
const fm10_21coopModel_1 = require("../models/fm10_21coopModel");
const answer10_21Model_1 = require("../models/answer10_21Model");
const fm10_11coopModel_1 = require("../models/fm10_11coopModel");
const answer10_11Model_1 = require("../models/answer10_11Model");
const assignmentFileModel_1 = require("../models/assignmentFileModel");
const study_groupModel_1 = require("../models/study_groupModel");
const activity_yearModel_1 = require("../models/activity_yearModel");
const fm10_13coopModel_1 = require("../models/fm10_13coopModel");
const answer10_13Model_1 = require("../models/answer10_13Model");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '1234',
    database: 'ecpcoop',
    logging: false,
    models: [
        YearModel_1.Year,
        companyModel_1.Company,
        provinceModel_1.Province,
        studentModel_1.Student,
        activityModel_1.Activity,
        activity_studentModel_1.Activity_Student,
        fileModel_1.File,
        teacherModel_1.Teacher,
        student_companyModel_1.Student_Company,
        meetingModel_1.Meeting,
        factoryModel_1.Factory,
        branchModel_1.Branch,
        adminModel_1.Admin,
        roleModel_1.Role,
        qualificationModel_1.Qualification,
        formModel_1.Form,
        questionModel_1.Question,
        answerModel_1.Answerfm10_14,
        fm10_14coopModel_1.Fm10_14_coop,
        fm10_20coopModel_1.Fm10_20_coop,
        answer10_20Model_1.Answerfm10_20,
        fm10_18coopModel_1.Fm10_18_coop,
        answer10_18Model_1.Answerfm10_18,
        fm10_21coopModel_1.Fm10_21_coop,
        answer10_21Model_1.Answerfm10_21,
        fm10_11coopModel_1.Fm10_11_coop,
        answer10_11Model_1.Answerfm10_11,
        assignmentFileModel_1.AssignmentFile,
        study_groupModel_1.Study_group,
        activity_yearModel_1.Activity_Year,
        fm10_13coopModel_1.Fm10_13_coop,
        answer10_13Model_1.Answerfm10_13,
    ],
    sync: { force: false, alter: true },
});
exports.default = connection;
