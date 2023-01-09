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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignmentAdmin = exports.deleteAssignment = exports.updateAssignment = exports.getAssignmentById = exports.getAssignment = exports.createAssignment = void 0;
const assignmentFileModel_1 = require("../models/assignmentFileModel");
const studentModel_1 = require("../models/studentModel");
const YearModel_1 = require("../models/YearModel");
const { Op } = require('sequelize');
const createAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const assignmentAll = yield assignmentFileModel_1.AssignmentFile.findAll({
        where: { name_assignment_file: name },
    });
    if (assignmentAll.length > 0) {
        res.status(400).json({ message: 'Assignment already exists' });
    }
    else {
        const assignment = yield assignmentFileModel_1.AssignmentFile.create({
            name_assignment_file: name,
        });
        return res
            .status(200)
            .json({ message: 'Assignment created successfully', data: assignment });
    }
});
exports.createAssignment = createAssignment;
const getAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.id;
    const date = req.query.time;
    const student = yield studentModel_1.Student.findAll({
        where: { idstudent: id },
        include: [{ model: YearModel_1.Year, as: 'year', where: { status_year: 'yes' } }],
    });
    if (student.length > 0) {
        const assignment = yield assignmentFileModel_1.AssignmentFile.findAll({
            where: { status_assignment_file: 'active' },
        });
        let data = [];
        assignment.forEach((e) => {
            e.start_date = new Date(e.start_date);
            e.end_date = new Date(e.end_date);
            if (e.start_date <= new Date(date) && e.end_date >= new Date(date)) {
                data.push(e);
            }
            else if (e.start_date == null && e.end_date == null) {
                data.push(null);
            }
        });
        return res
            .status(200)
            .json({ message: 'Assignment get successfully', data: data });
    }
    else {
        return res
            .status(400)
            .json({ message: 'student is not in the current academic year' });
    }
});
exports.getAssignment = getAssignment;
const getAssignmentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const assignment = yield assignmentFileModel_1.AssignmentFile.findByPk(id);
    return res
        .status(200)
        .json({ message: 'Assignment get successfully', data: assignment });
});
exports.getAssignmentById = getAssignmentById;
const updateAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const assignment = yield assignmentFileModel_1.AssignmentFile.update(Object.assign({}, req.body), { where: { idassignment_file: id } });
    if (assignment) {
        return res.status(200).json({ message: 'Assignment updated successfully' });
    }
});
exports.updateAssignment = updateAssignment;
const deleteAssignment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const assignment = yield assignmentFileModel_1.AssignmentFile.update({ status_assignment_file: 'inactive' }, { where: { idassignment_file: id } });
    if (assignment) {
        return res.status(200).json({ message: 'Assignment deleted successfully' });
    }
});
exports.deleteAssignment = deleteAssignment;
const getAssignmentAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const assignment = yield assignmentFileModel_1.AssignmentFile.findAll({ where: { status_assignment_file: 'active' } });
    return res
        .status(200)
        .json({ message: 'Assignment get successfully', data: assignment });
});
exports.getAssignmentAdmin = getAssignmentAdmin;
