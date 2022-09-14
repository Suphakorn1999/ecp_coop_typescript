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
exports.deleteActivity = exports.updateActivity = exports.getActivityById = exports.getAllActivity = exports.createActivity = void 0;
const activityModel_1 = require("../models/activityModel");
const createActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activity = yield activityModel_1.Activity.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'Activity created successfully', data: activity });
});
exports.createActivity = createActivity;
const getAllActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allactivities = yield activityModel_1.Activity.findAll({ where: { status: 'active' }, order: [['idactivity', 'ASC']] });
    return res
        .status(200)
        .json({ message: 'Activities fetched successfully', data: Allactivities });
});
exports.getAllActivity = getAllActivity;
const getActivityById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const activities = yield activityModel_1.Activity.findByPk(id);
    return res
        .status(200)
        .json({ message: 'Activity fetched successfully', data: activities });
});
exports.getActivityById = getActivityById;
const updateActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const activity = yield activityModel_1.Activity.update(Object.assign({}, req.body), { where: { idactivity: id } });
    if (activity) {
        return res.status(200).json({ message: 'Activity updated successfully' });
    }
});
exports.updateActivity = updateActivity;
const deleteActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const activity = yield activityModel_1.Activity.update({ status: 'inactive' }, { where: { idactivity: id } });
    if (activity) {
        return res.status(200).json({ message: 'Activity deleted successfully' });
    }
});
exports.deleteActivity = deleteActivity;
