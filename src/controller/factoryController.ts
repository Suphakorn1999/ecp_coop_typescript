import express from 'express';
import { RequestHandler } from 'express';
import { Factory } from '../models/factoryModel';


export const createFactory: RequestHandler = async (req,res,next: express.NextFunction) => {
    
    const Allfactory = await Factory.findAll({
      where: { name_factory: req.body.name_factory },
    });

    if(Allfactory.length > 0){
        return res.status(400).json({ message: 'ชื่อคณะมีอยู่แล้ว' });
    }
    const factory = await Factory.create({ ...req.body });
    
    if(factory){
      return res.status(200).json({ message: 'Factory created successfully' });
    }
}

export const getAllFactory: RequestHandler = async (req, res, next) => {
    const Allfactories = await Factory.findAll();
    return res
        .status(200)
        .json({ message: 'Factories fetched successfully', data: Allfactories });
}