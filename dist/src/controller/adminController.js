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
exports.loginAdmin = exports.createAdmin = void 0;
const adminModel_1 = require("../models/adminModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CryptoJS = require('crypto-js');
const { generateToken } = require('../middlewares/jwtHandler');
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.idrole;
    let passwordencrypt = CryptoJS.AES.encrypt(password, process.env.secretKey).toString();
    const admin = yield adminModel_1.Admin.create({
        idrole: role,
        name: name,
        username: username,
        password: passwordencrypt,
    });
    return res
        .status(200)
        .json({ message: 'Admin created successfully', data: admin });
});
exports.createAdmin = createAdmin;
const loginAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield adminModel_1.Admin.findOne({
        where: { username: username },
    });
    if (admin) {
        let passworddecrypt = CryptoJS.AES.decrypt(admin.password, process.env.secretKey).toString(CryptoJS.enc.Utf8);
        if (passworddecrypt === password) {
            const token = generateToken({
                idrole: admin.idrole,
                user: admin.name,
            });
            return res
                .cookie('token', token)
                .json({ msg: 'Login success', token: token });
        }
        else {
            return res.status(400).json({
                message: 'Password is incorrect',
            });
        }
    }
    else {
        return res.status(400).json({
            message: 'Username is incorrect',
        });
    }
});
exports.loginAdmin = loginAdmin;
