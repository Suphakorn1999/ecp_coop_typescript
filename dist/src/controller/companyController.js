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
exports.companyByidteacher = exports.updateQualification = exports.createQualification = exports.deleteCompanyById = exports.updateCompanyById = exports.getCompanyById = exports.getAllCompany = exports.createCompany = void 0;
const qualificationModel_1 = require("./../models/qualificationModel");
const companyModel_1 = require("../models/companyModel");
const provinceModel_1 = require("../models/provinceModel");
const compantdata = require('../services/company');
const { Op } = require('sequelize');
const config_1 = __importDefault(require("../config/config"));
const sequelize_1 = require("sequelize");
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
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const filter_province = req.query.filter_province ? req.query.filter_province : '';
    const filter_type_company = req.query.filter_type_company ? req.query.filter_type_company : '';
    if (filter_province != '' && filter_type_company != '') {
        const countcompany = yield companyModel_1.Company.count({ where: { name_company: { [Op.like]: `%${search_name}%` }, [Op.or]: [{ type_company_1: filter_type_company }, { type_company_2: filter_type_company }, { type_company_3: filter_type_company }], idprovince: filter_province } });
        const company = yield companyModel_1.Company.findAll({ include: [{ model: provinceModel_1.Province }, { model: qualificationModel_1.Qualification }], offset: offset, limit: limit, where: { name_company: { [Op.like]: `%${search_name}%` }, [Op.or]: [{ type_company_1: filter_type_company }, { type_company_2: filter_type_company }, { type_company_3: filter_type_company }], idprovince: filter_province } });
        return res
            .status(200)
            .json({ message: 'Company fetched successfully', data: company, count: countcompany });
    }
    else if (filter_province != '') {
        const countcompany = yield companyModel_1.Company.count({
            where: {
                [Op.or]: [
                    { name_company: { [Op.like]: `%${search_name}%` } },
                    { name_company_eng: { [Op.like]: `%${search_name}%` } },
                ],
                idprovince: filter_province
            },
        });
        const company = yield companyModel_1.Company.findAll({
            include: [{ model: provinceModel_1.Province }, { model: qualificationModel_1.Qualification }],
            offset: offset,
            limit: limit,
            where: {
                [Op.or]: [
                    { name_company: { [Op.like]: `%${search_name}%` } },
                    { name_company_eng: { [Op.like]: `%${search_name}%` } },
                ],
                idprovince: filter_province
            },
        });
        return res.status(200).json({
            message: 'Company fetched successfully',
            data: company,
            count: countcompany,
        });
    }
    else if (filter_type_company != '') {
        const countcompany = yield companyModel_1.Company.count({ where: { name_company: { [Op.like]: `%${search_name}%` }, [Op.or]: [{ type_company_1: filter_type_company }, { type_company_2: filter_type_company }, { type_company_3: filter_type_company }] } });
        const company = yield companyModel_1.Company.findAll({ include: [{ model: provinceModel_1.Province }, { model: qualificationModel_1.Qualification }], offset: offset, limit: limit, where: { name_company: { [Op.like]: `%${search_name}%` }, [Op.or]: [{ type_company_1: filter_type_company }, { type_company_2: filter_type_company }, { type_company_3: filter_type_company }] } });
        return res
            .status(200)
            .json({ message: 'Company fetched successfully', data: company, count: countcompany });
    }
    const countcompany = yield companyModel_1.Company.count({ where: { [Op.or]: [{ name_company: { [Op.like]: `%${search_name}%` } }, { name_company_eng: { [Op.like]: `%${search_name}%` } }] } });
    const company = yield companyModel_1.Company.findAll({ include: [{ model: provinceModel_1.Province }, { model: qualificationModel_1.Qualification }], offset: offset, limit: limit, where: { [Op.or]: [{ name_company: { [Op.like]: `%${search_name}%` } }, { name_company_eng: { [Op.like]: `%${search_name}%` } }] }, order: [['name_company', 'ASC']] });
    return res
        .status(200)
        .json({ message: 'Company fetched successfully', data: company, count: countcompany });
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
const companyByidteacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user.id;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const meeting = yield config_1.default.query(`SELECT m.idmeeting,sc.idstudent_company,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS student,
      y.term,y.year,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,c.name_company,p.name_province,m.name_project,c.address,c.urlmap
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      WHERE t.idteacher = ${id} 
      GROUP BY c.idcompany 
      limit ${limit} offset ${offset}
      `, { type: sequelize_1.QueryTypes.SELECT });
    meeting.forEach((item) => {
        item.student = JSON.parse(item.student);
    });
    return res
        .status(200)
        .json({ message: 'Meeting fetched successfully', data: meeting });
});
exports.companyByidteacher = companyByidteacher;
