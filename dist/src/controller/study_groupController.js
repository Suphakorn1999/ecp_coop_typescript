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
exports.deleteStudy_group = exports.updateStudy_group = exports.createStudy_group = exports.getStudy_groupById = exports.getStudy_group = void 0;
const study_groupModel_1 = require("../models/study_groupModel");
const getStudy_group = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const study_group = yield study_groupModel_1.Study_group.findAll();
        res.json(study_group);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getStudy_group = getStudy_group;
const getStudy_groupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const study_group = yield study_groupModel_1.Study_group.findByPk(id);
        if (study_group) {
            res.json(study_group);
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.getStudy_groupById = getStudy_groupById;
const createStudy_group = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name_study_group } = req.body;
        const study_group = yield study_groupModel_1.Study_group.create({
            name_study_group,
        });
        if (study_group) {
            return res.json({
                message: 'Study_group created',
                study_group,
            });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.createStudy_group = createStudy_group;
const updateStudy_group = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name_study_group } = req.body;
        const study_group = yield study_groupModel_1.Study_group.findByPk(id);
        if (study_group) {
            study_group.name_study_group = name_study_group;
            yield study_group.save();
            res.json({
                message: 'Study_group updated',
                study_group,
            });
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.updateStudy_group = updateStudy_group;
const deleteStudy_group = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteRowCount = yield study_groupModel_1.Study_group.destroy({
            where: { idstudy_group: id },
        });
        res.json({
            message: 'Study_group deleted',
            count: deleteRowCount,
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.deleteStudy_group = deleteStudy_group;
