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
exports.getAllBranch = exports.deleteBranch = exports.updateBranch = exports.createBranch = void 0;
const factoryModel_1 = require("../models/factoryModel");
const branchModel_1 = require("../models/branchModel");
const { Op } = require('sequelize');
const createBranch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allbranch = yield branchModel_1.Branch.findAll({
        where: { name_branch: req.body.name_branch },
    });
    const Allfactory = yield factoryModel_1.Factory.findAll({ where: { idfactory: req.body.idfactory } });
    if (Allfactory.length === 0) {
        return res.status(400).json({ message: 'ไม่พบคณะนี้' });
    }
    if (Allbranch.length > 0) {
        return res.status(400).json({ message: 'ชื่อสาขามีอยู่แล้ว' });
    }
    const branch = yield branchModel_1.Branch.create(Object.assign({}, req.body));
    if (branch) {
        return res.status(200).json({ message: 'Branch created successfully' });
    }
});
exports.createBranch = createBranch;
const updateBranch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const branch = yield branchModel_1.Branch.update(Object.assign({}, req.body), { where: { idbranch: id } });
    if (branch) {
        return res.status(200).json({ message: 'Branch updated successfully' });
    }
});
exports.updateBranch = updateBranch;
const deleteBranch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const branch = yield branchModel_1.Branch.update({ status: 'inactive' }, { where: { idbranch: id } });
    if (branch) {
        return res.status(200).json({ message: 'Branch deleted successfully' });
    }
});
exports.deleteBranch = deleteBranch;
const getAllBranch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';
    const Allbranches = yield branchModel_1.Branch.findAll({
        include: [{
                model: factoryModel_1.Factory,
                as: 'factory',
            }],
        offset: offset,
        limit: limit,
        where: { [Op.or]: [{ name_branch: { [Op.like]: `%${search_name}%` } }, { '$factory.name_factory$': { [Op.like]: `%${search_name}%` } }] },
    });
    return res
        .status(200)
        .json({ message: 'Branches fetched successfully', data: Allbranches });
});
exports.getAllBranch = getAllBranch;
