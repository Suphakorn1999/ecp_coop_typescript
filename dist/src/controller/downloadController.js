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
exports.downloadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const CryptoJS = require('crypto-js');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const downloadFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const namefile = req.query.file;
    if (namefile == null) {
        return res.status(400).json({ message: 'File not found' });
    }
    let name = CryptoJS.AES.decrypt(namefile, process.env.HEX).toString(CryptoJS.enc.Utf8);
    const file = fs_1.default.createReadStream('public/uploads/' + name);
    // res.setHeader('Content-disposition', 'attachment; filename=' + req.query.file);
    res.setHeader('Content-type', 'application/pdf');
    file.pipe(res);
});
exports.downloadFile = downloadFile;
