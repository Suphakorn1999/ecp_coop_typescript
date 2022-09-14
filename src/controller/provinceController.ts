import express from 'express';
import { RequestHandler } from 'express';
import { Province } from '../models/provinceModel';

export const createProvince: RequestHandler = async (req,res,next: express.NextFunction,) => {
    const province = await Province.findAll({
        where: { name_province: req.body.name_province }
    });
    
    if (province.length > 0) {
        await Province.update({ ...req.body },{ where: { name_province: req.body.name_province } });
        return res.status(200).json({ message: 'Province updated successfully' });
    }
    
    const provinces = await Province.create({ ...req.body });
    
    return res
        .status(200)
        .json({ message: 'Province created successfully', data: provinces });
}

export const getAllProvince: RequestHandler = async (req, res, next) => {
    const Allprovinces = await Province.findAll({
      order: [['name_province', 'ASC']],
    });
    
    return res
        .status(200)
        .json({ message: 'Provinces fetched successfully', data: Allprovinces });
}