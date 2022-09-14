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
exports.deleteForm = exports.updateform = exports.getFormById = exports.getAllForm = exports.createForm = void 0;
const formModel_1 = require("../models/formModel");
const createForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield formModel_1.Form.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'form created successfully', data: form });
});
exports.createForm = createForm;
const getAllForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const AllForm = yield formModel_1.Form.findAll({
        where: { status_form: 'active' },
        order: [['idform', 'ASC']],
    });
    return res
        .status(200)
        .json({ message: 'form fetched successfully', data: AllForm });
});
exports.getAllForm = getAllForm;
const getFormById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const form = yield formModel_1.Form.findByPk(id);
    return res
        .status(200)
        .json({ message: 'form fetched successfully', data: form });
});
exports.getFormById = getFormById;
const updateform = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const form = yield formModel_1.Form.update(Object.assign({}, req.body), { where: { idform: id } });
    if (form) {
        return res.status(200).json({ message: 'form updated successfully' });
    }
});
exports.updateform = updateform;
const deleteForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const form = yield formModel_1.Form.update({ status_form: 'inactive' }, { where: { idform: id } });
    if (form) {
        return res.status(200).json({ message: 'form deleted successfully' });
    }
});
exports.deleteForm = deleteForm;
