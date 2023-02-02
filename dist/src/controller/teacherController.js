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
exports.updateTeacher = exports.getAllTeacher = exports.createTeacher = void 0;
const teacherModel_1 = require("../models/teacherModel");
const branchModel_1 = require("../models/branchModel");
const factoryModel_1 = require("../models/factoryModel");
const { Op } = require('sequelize');
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.idrole = 2;
    if (req.body.branch) {
        const branchId = yield branchModel_1.Branch.findAll({
            where: { name_branch: req.body.branch },
        });
        if (branchId.length > 0) {
            req.body.idbranch = branchId[0].idbranch;
        }
        else {
            return res.status(400).json({ message: 'Branch not found' });
        }
    }
    const Allteacher = yield teacherModel_1.Teacher.findAll({ where: { prename_teacher: req.body.prename_teacher, firstname_teacher: req.body.firstname_teacher, lastname_teacher: req.body.lastname_teacher } });
    if (Allteacher.length > 0) {
        return res.status(400).json({ message: 'มีชื่ออาจารย์อยู่แล้ว' });
    }
    const teacher = yield teacherModel_1.Teacher.create(Object.assign({}, req.body));
    if (teacher) {
        return res.status(200).json({ message: 'Teacher created successfully' });
    }
});
exports.createTeacher = createTeacher;
const getAllTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const Allteachers = yield teacherModel_1.Teacher.findAll({
        include: [
            {
                model: branchModel_1.Branch,
                include: [{ model: factoryModel_1.Factory }],
            },
        ],
        attributes: ['idteacher', 'prename_teacher', 'firstname_teacher', 'lastname_teacher', 'status_teacher'],
        offset: offset,
        limit: limit,
        where: {
            [Op.or]: [
                { firstname_teacher: { [Op.like]: `%${search_name}%` } },
                { lastname_teacher: { [Op.like]: `%${search_name}%` } },
            ],
        }
    });
    return res.status(200).json({ message: 'Teachers fetched successfully', data: Allteachers });
});
exports.getAllTeacher = getAllTeacher;
const updateTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacherModel_1.Teacher.findAll(req.body.id);
    if (teacher) {
        yield teacherModel_1.Teacher.update(Object.assign({}, req.body), { where: { idteacher: req.body.id } });
        return res.status(200).json({ message: 'Teacher updated successfully' });
    }
    return res.status(400).json({ message: 'Teacher not found' });
});
exports.updateTeacher = updateTeacher;
