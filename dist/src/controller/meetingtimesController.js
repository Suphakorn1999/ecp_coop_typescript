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
exports.getMeetingTimes = exports.updateMeetingTimes = exports.createMeetingTimes = void 0;
const meetingtimesModel_1 = require("../models/meetingtimesModel");
const YearModel_1 = require("../models/YearModel");
const createMeetingTimes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ALLmeetingtimes = yield meetingtimesModel_1.Meeting_Times.findAll({
            where: {
                idyear: req.body.idyear,
                times: req.body.times,
            }
        });
        if (ALLmeetingtimes.length > 0) {
            return res.status(400).json({ message: 'Meeting times already exists' });
        }
        const meetingtimes = yield meetingtimesModel_1.Meeting_Times.create(Object.assign({}, req.body));
        if (meetingtimes) {
            return res.status(200).json({ message: 'Meeting times created successfully' });
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Meeting times already exists' });
    }
});
exports.createMeetingTimes = createMeetingTimes;
const updateMeetingTimes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetingtimes = yield meetingtimesModel_1.Meeting_Times.update(Object.assign({}, req.body), { where: { idyear: req.body.idyear, times: req.body.times } });
        if (meetingtimes) {
            return res.status(200).json({ message: 'Meeting times updated successfully' });
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Meeting times not found' });
    }
});
exports.updateMeetingTimes = updateMeetingTimes;
const getMeetingTimes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = yield YearModel_1.Year.findAll({ where: { status_year: 'yes' } });
        if (year.length > 0 && req.query.idyear == null) {
            const meetingtimes = yield meetingtimesModel_1.Meeting_Times.findAll({ where: { idyear: year[0].idyear, times: req.query.times }, include: [{ model: YearModel_1.Year, as: 'year' }] });
            if (meetingtimes) {
                return res.status(200).json({ message: 'Meeting times found', data: meetingtimes });
            }
        }
        else if (year.length > 0 && req.query.idyear != null) {
            const meetingtimes = yield meetingtimesModel_1.Meeting_Times.findAll({ where: { idyear: req.query.idyear, times: req.query.times }, include: [{ model: YearModel_1.Year, as: 'year' }] });
            if (meetingtimes) {
                return res.status(200).json({ message: 'Meeting times found', data: meetingtimes });
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Meeting times not found' });
    }
});
exports.getMeetingTimes = getMeetingTimes;
