"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminModel_1 = require("./../models/adminModel");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateToken(json) {
    const secretKey = process.env.secretKey;
    const options = {
        expiresIn: '24h',
    };
    return (0, jsonwebtoken_1.sign)(json, secretKey, options);
}
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    if (authHeader.split(' ')[0] != 'Bearer') {
        return res.status(403).json('Not Bearer');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    const secretKey = process.env.secretKey;
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
}
function verifyTokenAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    if (authHeader.split(' ')[0] != 'Bearer') {
        return res.status(403).json('Not Bearer');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    const secretKey = process.env.secretKey;
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secretKey);
        const admin = adminModel_1.Admin.findByPk(decoded.idrole);
        if (admin == null) {
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }
        else {
            return res.status(200).json({ message: 'Success to authenticate token.' });
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
}
function verifyTokenStudent(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    if (authHeader.split(' ')[0] != 'Bearer') {
        return res.status(403).json('Not Bearer');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    const secretKey = process.env.secretKey;
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, secretKey);
        req.body.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
    }
}
module.exports = { generateToken, verifyToken, verifyTokenAdmin, verifyTokenStudent };
