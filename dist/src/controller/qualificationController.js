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
exports.updateQualification = exports.createQualification = void 0;
const qualificationModel_1 = require("../models/qualificationModel");
const createQualification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allqualification = yield qualificationModel_1.Qualification.findAll({ where: { idcompany: req.body.idcompany } });
    if (allqualification.length > 0) {
        return res.status(400).json({ message: 'There is information in the system' });
    }
    else {
        const qualification = yield qualificationModel_1.Qualification.create(Object.assign({}, req.body));
        return res
            .status(200)
            .json({ message: 'Qualification created successfully', data: qualification });
    }
});
exports.createQualification = createQualification;
const updateQualification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (req.body) {
        const qualification = yield qualificationModel_1.Qualification.update(Object.assign({}, req.body), { where: { idcompany: id } });
        return res.status(200).json({ message: 'Qualification updated successfully', data: qualification });
    }
});
exports.updateQualification = updateQualification;
