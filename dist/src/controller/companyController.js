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
exports.updateQualification = exports.createQualification = exports.deleteCompanyById = exports.updateCompanyById = exports.getCompanyById = exports.getAllCompany = exports.createCompany = void 0;
const qualificationModel_1 = require("./../models/qualificationModel");
const companyModel_1 = require("../models/companyModel");
const provinceModel_1 = require("../models/provinceModel");
const compantdata = require('../services/company');
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const province = yield provinceModel_1.Province.findAll({ where: { name_province: req.body.name_province } });
    if (province.length > 0) {
        req.body.idprovince = province[0].idprovince;
    }
    else {
        return res.status(400).json({ message: 'ไม่พบจังหวัดนี้' });
    }
    const company = yield companyModel_1.Company.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'Company created successfully', data: company });
});
exports.createCompany = createCompany;
const getAllCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield companyModel_1.Company.findAll({ include: [{ model: provinceModel_1.Province }, { model: qualificationModel_1.Qualification }] });
    return res
        .status(200)
        .json({ message: 'Companies fetched successfully', data: company });
});
exports.getAllCompany = getAllCompany;
const getCompanyById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const companies = yield companyModel_1.Company.findByPk(id, { include: [{ model: provinceModel_1.Province }, { model: qualificationModel_1.Qualification }] });
    return res
        .status(200)
        .json({ message: 'Company fetched successfully', data: companies });
});
exports.getCompanyById = getCompanyById;
const updateCompanyById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const companies = yield companyModel_1.Company.findByPk(id);
    const province = yield provinceModel_1.Province.findAll({ where: { name_province: req.body.name_province } });
    if (province.length > 0) {
        req.body.idprovince = province[0].idprovince;
    }
    if (companies) {
        yield companyModel_1.Company.update(Object.assign({}, req.body), { where: { idcompany: id } });
        return res.status(200).json({ message: 'Company updated successfully' });
    }
    return res.status(400).json({ message: 'Company not found' });
});
exports.updateCompanyById = updateCompanyById;
const deleteCompanyById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const companies = yield companyModel_1.Company.findByPk(id);
    if (companies) {
        yield companyModel_1.Company.destroy({ where: { idcompany: id } });
        return res.status(200).json({ message: 'Company deleted successfully' });
    }
    return res.status(400).json({ message: 'Company not found' });
});
exports.deleteCompanyById = deleteCompanyById;
const createQualification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield companyModel_1.Company.findAll({ where: { name_company: req.body.name_company } });
    if (company.length > 0) {
        req.body.idcompany = company[0].idcompany;
    }
    else {
        return res.status(400).json({ message: 'ไม่พบบริษัทนี้' });
    }
    const qualification = yield qualificationModel_1.Qualification.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'Qualification created successfully', data: qualification });
});
exports.createQualification = createQualification;
const updateQualification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const companies = yield companyModel_1.Company.findByPk(id);
    if (companies) {
        yield qualificationModel_1.Qualification.update(Object.assign({}, req.body), { where: { idcompany: id } });
        return res.status(200).json({ message: 'Qualification updated successfully' });
    }
    return res.status(400).json({ message: 'Qualification not found' });
});
exports.updateQualification = updateQualification;
