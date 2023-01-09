import { Year } from './../models/YearModel';
import { RequestHandler } from 'express';
import express from 'express';


export const createYear: RequestHandler = async (req,res,next: express.NextFunction) => {
    try{
    const status = req.body.status_year;
    const Allyear = await Year.findAll({ where: { year: req.body.year, term: req.body.term } });

        if (Allyear.length > 0) {
            return res.status(400).json({ message: 'ปีการศึกษามีอยู่แล้ว' });
        }

    if (status == 'yes') {
        const updateyear = await Year.findAll({ where: { status_year: 'yes' } });

        if (updateyear.length > 0) {
            await updateyear[0].update({ status_year: 'no' });
        }

        const year = await Year.create({ ...req.body });
        if (year) {
            return res.status(200).json({ message: 'Year created successfully' });
        }
    } else if (status == 'no') {
        const year = await Year.create({ ...req.body });
        if (year) {
            return res.status(200).json({ message: 'Year created successfully' });
        }
    }
  }catch{
    return res.status(400).json({ message: 'Year created failed' });
  }
}

export const getAllYear: RequestHandler = async (req:any, res:any, next) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const Allyears = await Year.findAll({
      order: [
        ['status_year', 'yes'],
        ['year', 'DESC'],
        ['term', 'DESC'],
      ],
      offset: offset,
      limit: limit,
    });
    return res
        .status(200)
        .json({ message: 'Years fetched successfully', data: Allyears });
}

export const updateYear: RequestHandler = async (req:any, res, next) => {
  try{
    const status = req.body.status_year;
    if(status == 'yes'){
        const updateyear = await Year.findAll({ where: { status_year: 'yes' } });

        if (updateyear.length > 0) {
            await updateyear[0].update({ status_year: 'no' });
        }
        
        const year = await Year.findByPk(req.query.id);
        if (year) {
            await year.update({ ...req.body });
            return res.status(200).json({ message: 'Year updated successfully' });
        } else {
            return res.status(400).json({ message: 'Year not found' });
        }
    }
    else if(status == 'no'){
        const year = await Year.findByPk(req.query.id);
        if (year) {
            await year.update({ ...req.body });
            return res.status(200).json({ message: 'Year updated successfully' });
        } else {
            return res.status(400).json({ message: 'Year not found' });
        }
    }
  }catch{
    return res.status(400).json({ message: 'Year updated failed' });
  }
    
}