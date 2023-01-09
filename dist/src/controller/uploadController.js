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
exports.uploadfile = void 0;
const fileModel_1 = require("../models/fileModel");
const multer_1 = __importDefault(require("multer"));
const moment_1 = __importDefault(require("moment"));
const studentModel_1 = require("../models/studentModel");
const dotenv_1 = __importDefault(require("dotenv"));
const YearModel_1 = require("../models/YearModel");
const fs = require('fs');
dotenv_1.default.config();
const datenow = (0, moment_1.default)().tz('Asia/Bangkok').format('DD-MM-YYYY');
const time = (0, moment_1.default)().tz('Asia/Bangkok').format('HH:mm:ss');
const uploadfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const UserId = req.body.user.id;
    const student = yield studentModel_1.Student.findAll({ where: { idstudent: UserId }, include: [{ model: YearModel_1.Year, where: { status_year: "yes" } }] });
    if (!req.query.id) {
        return res.status(400).json({ message: 'id is required' });
    }
    if (student.length > 0) {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public/uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        });
        const upload = (0, multer_1.default)({ storage: storage }).array('file');
        upload(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                return res.status(500).json(err);
            }
            else if (err) {
                return res.status(500).json(err);
            }
            const data = req.files;
            if (data) {
                data.forEach((file, index) => __awaiter(void 0, void 0, void 0, function* () {
                    if (index != 0) {
                        return;
                    }
                    const filess = yield fileModel_1.File.create({
                        idstudent: UserId,
                        idassignmentFile: req.query.id,
                        name_file: file.originalname,
                        path_file: file.path,
                        type_file: file.mimetype,
                        date_file: time + ' ' + datenow,
                    });
                    if (filess) {
                        return res.status(200).json({ message: 'Upload file success' });
                    }
                }));
            }
            else {
                return res.status(400).json({ message: 'File not found' });
            }
        });
    }
    else {
        return res.status(500).json({ message: 'User not upload file' });
    }
});
exports.uploadfile = uploadfile;
