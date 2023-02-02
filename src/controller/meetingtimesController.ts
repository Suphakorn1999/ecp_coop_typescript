import express from 'express';
import { RequestHandler } from 'express';
import { QueryTypes } from 'sequelize';
import Connection from '../config/config';
import { Meeting_Times } from '../models/meetingtimesModel';
import { Year } from '../models/YearModel';

export const createMeetingTimes: RequestHandler = async (req, res, next:express.NextFunction) => {
    try{
        const ALLmeetingtimes = await Meeting_Times.findAll({
            where: {
                idyear: req.body.idyear,
                times: req.body.times,
            }
        })
        if (ALLmeetingtimes.length > 0) {
            return res.status(400).json({ message: 'Meeting times already exists' });
        }

        const meetingtimes = await Meeting_Times.create({ ...req.body });
        if (meetingtimes) {
            return res.status(200).json({ message: 'Meeting times created successfully' });
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Meeting times already exists' });
    }
    
}

export const updateMeetingTimes: RequestHandler = async (req, res, next) => {
    try{
        const meetingtimes = await Meeting_Times.update({ ...req.body }, { where: { idyear: req.body.idyear, times: req.body.times } });
        if (meetingtimes) {
            return res.status(200).json({ message: 'Meeting times updated successfully' });
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Meeting times not found' });
    }  
}

export const getMeetingTimes: RequestHandler = async (req, res, next) => {
    try{
        const year = await Year.findAll({ where: { status_year : 'yes' } });
        if (year.length > 0 && req.query.idyear == null){
            const meetingtimes = await Meeting_Times.findAll({ where: { idyear: year[0].idyear, times: req.query.times },include: [{ model: Year, as: 'year' }] });
            if (meetingtimes) {
                return res.status(200).json({ message: 'Meeting times found', data: meetingtimes });
            }
        } else if (year.length > 0 && req.query.idyear != null) {
            const meetingtimes = await Meeting_Times.findAll({ where: { idyear: req.query.idyear, times: req.query.times }, include: [{ model: Year, as: 'year' }] });
            if (meetingtimes) {
                return res.status(200).json({ message: 'Meeting times found', data: meetingtimes });
            }
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Meeting times not found' });
    }
}
