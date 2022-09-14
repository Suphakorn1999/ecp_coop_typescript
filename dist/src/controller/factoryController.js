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
exports.getAllFactory = exports.createFactory = void 0;
const factoryModel_1 = require("../models/factoryModel");
const createFactory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allfactory = yield factoryModel_1.Factory.findAll({
        where: { name_factory: req.body.name_factory },
    });
    if (Allfactory.length > 0) {
        return res.status(400).json({ message: 'ชื่อคณะมีอยู่แล้ว' });
    }
    const factory = yield factoryModel_1.Factory.create(Object.assign({}, req.body));
    if (factory) {
        return res.status(200).json({ message: 'Factory created successfully' });
    }
});
exports.createFactory = createFactory;
const getAllFactory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allfactories = yield factoryModel_1.Factory.findAll();
    return res
        .status(200)
        .json({ message: 'Factories fetched successfully', data: Allfactories });
});
exports.getAllFactory = getAllFactory;
