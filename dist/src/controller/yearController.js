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
exports.updateYear = exports.getAllYear = exports.createYear = void 0;
const YearModel_1 = require("./../models/YearModel");
const createYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allyear = yield YearModel_1.Year.findAll({ where: { year: req.body.year, term: req.body.term } });
    if (Allyear.length > 0) {
        return res.status(400).json({ message: 'ปีการศึกษามีอยู่แล้ว' });
    }
    const year = yield YearModel_1.Year.create(Object.assign({}, req.body));
    if (year) {
        return res.status(200).json({ message: 'Year created successfully' });
    }
});
exports.createYear = createYear;
const getAllYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const Allyears = yield YearModel_1.Year.findAll({
        order: [
            ['year', 'DESC'],
            ['term', 'DESC'],
        ],
        offset: offset,
        limit: limit,
    });
    return res
        .status(200)
        .json({ message: 'Years fetched successfully', data: Allyears });
});
exports.getAllYear = getAllYear;
const updateYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const year = yield YearModel_1.Year.findByPk(req.query.id);
    if (year) {
        yield year.update(Object.assign({}, req.body));
        return res.status(200).json({ message: 'Year updated successfully' });
    }
    else {
        return res.status(400).json({ message: 'Year not found' });
    }
});
exports.updateYear = updateYear;
