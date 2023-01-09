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
exports.updateStatusFile = exports.getFileformadminbyid = exports.getFileformadmin = exports.deleteFile = exports.getFile = void 0;
const assignmentFileModel_1 = require("../models/assignmentFileModel");
const fileModel_1 = require("../models/fileModel");
const studentModel_1 = require("../models/studentModel");
const fs = require('fs');
const path_1 = __importDefault(require("path"));
const { Op } = require('sequelize');
const getFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.user.id;
        const file = yield fileModel_1.File.findAll({ where: { idstudent: id },
            attributes: [
                'idfile',
                'idassignmentFile',
                'name_file',
                'path_file',
                'type_file',
                'date_file',
                'note_file',
                'status_file'
            ],
            include: [
                {
                    model: studentModel_1.Student,
                    attributes: [
                        'student_id',
                        'prename_student',
                        'fname_student',
                        'lname_student',
                    ],
                },
                { model: assignmentFileModel_1.AssignmentFile },
            ],
        });
        if (file.length > 0) {
            return res.status(200).json({ message: 'File fetched successfully', data: file });
        }
        else {
            return res.status(200).json({ message: 'File not found', data: [] });
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'File not found' });
    }
});
exports.getFile = getFile;
const deleteFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const namefile = req.query.name_file;
    if (namefile == null) {
        return res.status(400).json({ message: 'Name File not found' });
    }
    const absolutePath = path_1.default.resolve('public/uploads/' + namefile);
    if (fs.existsSync(absolutePath)) {
        fileModel_1.File.destroy({
            where: { name_file: namefile },
        })
            .then((result) => {
            if (result) {
                fs.unlinkSync(absolutePath);
                return res.status(200).json({ message: 'Delete file success' });
            }
            else {
                return res.status(400).json({ message: 'Delete file fail' });
            }
        })
            .catch((err) => {
            return res.status(500).json({ message: 'Delete file fail' });
        });
    }
    else {
        return res.status(400).json({ message: 'File not found' });
    }
});
exports.deleteFile = deleteFile;
const getFileformadmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const file = yield fileModel_1.File.findAll({
        attributes: [
            'idfile',
            'idassignmentFile',
            'name_file',
            'path_file',
            'type_file',
            'date_file',
            'note_file',
            'status_file'
        ],
        include: [
            {
                model: studentModel_1.Student,
                attributes: [
                    'student_id',
                    'prename_student',
                    'fname_student',
                    'lname_student',
                ],
                as: 'student',
            },
            { model: assignmentFileModel_1.AssignmentFile },
        ],
        where: {
            [Op.or]: [
                { '$student.fname_student$': { [Op.like]: '%' + search_name + '%' } },
                { '$student.lname_student$': { [Op.like]: '%' + search_name + '%' } },
                { '$student.student_id$': { [Op.like]: '%' + search_name + '%' } },
                { 'name_file': { [Op.like]: '%' + search_name + '%' } },
            ]
        },
        offset: offset,
        limit: limit,
        order: [['date_file', 'DESC']],
    });
    if (file.length > 0) {
        return res.status(200).json({ message: 'File fetched successfully', data: file });
    }
    else {
        return res.status(200).json({ message: 'File fetched successfully', data: [] });
    }
});
exports.getFileformadmin = getFileformadmin;
const getFileformadminbyid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const file = yield fileModel_1.File.findAll({
        attributes: [
            'idfile',
            'idassignmentFile',
            'name_file',
            'path_file',
            'type_file',
            'date_file',
            'note_file',
            'status_file'
        ],
        include: [
            {
                model: studentModel_1.Student,
                attributes: [
                    'student_id',
                    'prename_student',
                    'fname_student',
                    'lname_student',
                ],
                as: 'student',
            },
            { model: assignmentFileModel_1.AssignmentFile },
        ],
        where: {
            idassignmentFile: id,
            [Op.or]: [
                { '$student.fname_student$': { [Op.like]: '%' + search_name + '%' } },
                { '$student.lname_student$': { [Op.like]: '%' + search_name + '%' } },
                { '$student.student_id$': { [Op.like]: '%' + search_name + '%' } },
                { 'name_file': { [Op.like]: '%' + search_name + '%' } },
            ]
        },
        offset: offset,
        limit: limit,
    });
    if (file.length > 0) {
        return res.status(200).json({ message: 'File fetched successfully', data: file });
    }
    else {
        return res.status(200).json({ message: 'File fetched successfully', data: [] });
    }
});
exports.getFileformadminbyid = getFileformadminbyid;
const updateStatusFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.idfile;
    const status = req.body.status_file;
    const note = req.body.note_file;
    const file = yield fileModel_1.File.update({
        status_file: status,
        note_file: note,
    }, {
        where: { idfile: id },
    });
    if (file[0] > 0) {
        return res.status(200).json({ message: 'Update file success' });
    }
    else {
        return res.status(400).json({ message: 'Update file fail' });
    }
});
exports.updateStatusFile = updateStatusFile;
