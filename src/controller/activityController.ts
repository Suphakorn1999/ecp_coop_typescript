import express from 'express';
import { RequestHandler } from 'express';
import { Activity } from '../models/activityModel';
import { Activity_Year } from '../models/activity_yearModel';
import { Year } from '../models/YearModel';


export const createActivity: RequestHandler = async (req,res,next: express.NextFunction) => {
    const activityAll = await Activity.findAll({ where: { name_activity: req.body.name_activity }});
    if(activityAll.length > 0){
        return res.status(200).json({message:'Activity already exists'});
    }

    const activity = await Activity.create({...req.body});
    
    return res
        .status(200)
        .json({message:'Activity created successfully',data:activity});
}

export const getAllActivity: RequestHandler = async (req, res, next) => {
        const Allactivities = await Activity.findAll({order: [['idactivity', 'ASC']]});

        return res
            .status(200)
            .json({ message: 'Activities fetched successfully', data: Allactivities });

}

export const getAllActivityByYear: RequestHandler = async (req, res, next) => {
    const year = await Year.findAll({ where: { status_year: 'yes' } });
    if (year.length > 0 && req.query.idyear == undefined) {
        const Allactivities = await Activity.findAll({ where: { status: 'active' }, order: [['idactivity', 'ASC']], include: [{ model: Activity_Year, where: { idyear: year[0].idyear } }] });

        return res
            .status(200)
            .json({ message: 'Activities fetched successfully', data: Allactivities });
    } else if (year.length > 0 && req.query.idyear != undefined) {
        const Allactivities = await Activity.findAll({ where: { status: 'active' }, order: [['idactivity', 'ASC']], include: [{ model: Activity_Year, where: { idyear: req.query.idyear } }] },);

        return res
            .status(200)
            .json({ message: 'Activities fetched successfully', data: Allactivities });
    }
}

export const getActivityById: RequestHandler = async (req, res, next) => {
    const id: any = req.query.id;

    const activities: Activity | null = await Activity.findByPk(id);

    return res
        .status(200)
        .json({ message: 'Activity fetched successfully', data: activities });
}

export const updateActivity: RequestHandler = async (req, res, next: express.NextFunction) => {
    const id: any = req.query.id;
    const activity = await Activity.update({ ...req.body }, { where: { idactivity: id } });
    if (activity) {
        return res.status(200).json({ message: 'Activity updated successfully' });
    }
}

export const deleteActivity: RequestHandler = async (req, res, next: express.NextFunction) => {
    const id: any = req.query.id;
    const activity = await Activity.update({ status: 'inactive' }, { where: { idactivity: id } });
    if (activity) {
        return res.status(200).json({ message: 'Activity deleted successfully' });
    }
}

export const createActivityYear: RequestHandler = async (req, res, next: express.NextFunction) => {
    const activityAll = await Activity_Year.findAll({ where: { idyear: req.body.idyear, idactivity: req.body.idactivity } });
    if (activityAll.length > 0) {
        return res.status(200).json({ message: 'Activity already exists' });
    }
    const activity = await Activity_Year.create({ ...req.body });
    if (activity) {
        return res.status(200).json({ message: 'Activity created successfully' });
    }
}