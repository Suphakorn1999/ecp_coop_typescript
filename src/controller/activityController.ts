import express from 'express';
import { RequestHandler } from 'express';
import { Activity } from '../models/activityModel';

export const createActivity: RequestHandler = async (req,res,next: express.NextFunction) => {
    const activity = await Activity.create({...req.body});
    
    return res
        .status(200)
        .json({message:'Activity created successfully',data:activity});
}

export const getAllActivity: RequestHandler = async (req, res, next) => {
    const Allactivities = await Activity.findAll({where: { status: 'active' },order: [['idactivity', 'ASC']]});
    
    return res
        .status(200)
        .json({ message: 'Activities fetched successfully', data: Allactivities });
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