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
exports.deleteFile = exports.getFile = void 0;
const assignmentFileModel_1 = require("../models/assignmentFileModel");
const fileModel_1 = require("../models/fileModel");
const studentModel_1 = require("../models/studentModel");
const fs = require('fs');
const path_1 = __importDefault(require("path"));
const getFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.id;
    const file = yield fileModel_1.File.findAll({ where: { idstudent: id },
        attributes: [
            'idfile',
            'idassignmentFile',
            'name_file',
            'path_file',
            'type_file',
            'date_file',
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
        return res.status(400).json({ message: 'File not found' });
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
