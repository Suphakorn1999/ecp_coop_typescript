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
exports.createActivityYear = exports.deleteActivity = exports.updateActivity = exports.getActivityById = exports.getAllActivityByYear = exports.getAllActivity = exports.createActivity = void 0;
const activityModel_1 = require("../models/activityModel");
const activity_yearModel_1 = require("../models/activity_yearModel");
const YearModel_1 = require("../models/YearModel");
const createActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activityAll = yield activityModel_1.Activity.findAll({ where: { name_activity: req.body.name_activity } });
    if (activityAll.length > 0) {
        return res.status(200).json({ message: 'Activity already exists' });
    }
    const activity = yield activityModel_1.Activity.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: 'Activity created successfully', data: activity });
});
exports.createActivity = createActivity;
const getAllActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Allactivities = yield activityModel_1.Activity.findAll({ order: [['idactivity', 'ASC']] });
    return res
        .status(200)
        .json({ message: 'Activities fetched successfully', data: Allactivities });
});
exports.getAllActivity = getAllActivity;
const getAllActivityByYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const year = yield YearModel_1.Year.findAll({ where: { status_year: 'yes' } });
    if (year.length > 0 && req.query.idyear == undefined) {
        const Allactivities = yield activityModel_1.Activity.findAll({ where: { status: 'active' }, order: [['idactivity', 'ASC']], include: [{ model: activity_yearModel_1.Activity_Year, where: { idyear: year[0].idyear } }] });
        return res
            .status(200)
            .json({ message: 'Activities fetched successfully', data: Allactivities });
    }
    else if (year.length > 0 && req.query.idyear != undefined) {
        const Allactivities = yield activityModel_1.Activity.findAll({ where: { status: 'active' }, order: [['idactivity', 'ASC']], include: [{ model: activity_yearModel_1.Activity_Year, where: { idyear: req.query.idyear } }] });
        return res
            .status(200)
            .json({ message: 'Activities fetched successfully', data: Allactivities });
    }
});
exports.getAllActivityByYear = getAllActivityByYear;
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
const createActivityYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activityAll = yield activity_yearModel_1.Activity_Year.findAll({ where: { idyear: req.body.idyear, idactivity: req.body.idactivity } });
    if (activityAll.length > 0) {
        return res.status(200).json({ message: 'Activity already exists' });
    }
    const activity = yield activity_yearModel_1.Activity_Year.create(Object.assign({}, req.body));
    if (activity) {
        return res.status(200).json({ message: 'Activity created successfully' });
    }
});
exports.createActivityYear = createActivityYear;
