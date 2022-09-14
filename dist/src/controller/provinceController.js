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
exports.getAllProvince = exports.createProvince = void 0;
const provinceModel_1 = require("../models/provinceModel");
const createProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const province = yield provinceModel_1.Province.findAll({
        where: { name_province: req.body.name_province }
    });
    if (province.length > 0) {
        yield provinceModel_1.Province.update(Object.assign({}, req.body), { where: { name_province: req.body.name_province } });
        return res.status(200).json({ message: 'Province updated successfully' });
    }
    const provinces = yield provinceModel_1.Province.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'Province created successfully', data: provinces });
});
exports.createProvince = createProvince;
const getAllProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allprovinces = yield provinceModel_1.Province.findAll({
        order: [['name_province', 'ASC']],
    });
    return res
        .status(200)
        .json({ message: 'Provinces fetched successfully', data: Allprovinces });
});
exports.getAllProvince = getAllProvince;
