import { Year } from './../models/YearModel';
import { RequestHandler } from 'express';
import express from 'express';


export const createYear: RequestHandler = async (req,res,next: express.NextFunction) => {
    
    const Allyear = await Year.findAll({where: {year: req.body.year,term: req.body.term}});

    if(Allyear.length > 0){
        return res.status(400).json({ message: 'ปีการศึกษามีอยู่แล้ว' });
    }
    
    const year = await Year.create({ ...req.body });
    if(year){
      return res.status(200).json({ message: 'Year created successfully' });
    }
}

export const getAllYear: RequestHandler = async (req, res, next) => {
    const Allyears = await Year.findAll({
      order: [
        ['year', 'DESC'],
        ['term', 'DESC'],
      ],
    });
    return res
        .status(200)
        .json({ message: 'Years fetched successfully', data: Allyears });
}