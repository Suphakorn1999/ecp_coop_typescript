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
exports.deleteAssignment = exports.updateAssignment = exports.getAssignmentById = exports.getAssignment = exports.createAssignment = void 0;
const assignmentFileModel_1 = require("../models/assignmentFileModel");
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
    const assignment = yield assignmentFileModel_1.AssignmentFile.findAll();
    return res
        .status(200)
        .json({ message: 'Assignment get successfully', data: assignment });
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
