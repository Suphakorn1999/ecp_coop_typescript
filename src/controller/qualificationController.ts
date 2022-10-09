import express, { Express, Request, Response } from 'express';
import { RequestHandler } from 'express';
import { Qualification } from '../models/qualificationModel';

export const createQualification = async (req: Request,res: Response,next: express.NextFunction,) => {
    if(req.body){
        const allqualification = await Qualification.findAll({where:{idcompany:req.query.id}});
        if(allqualification.length > 0){
            return res.status(400).json({ message: 'มีข้อมูลในระบบแล้ว' });
        }else{
            const qualification = await Qualification.create({...req.body});                                    
            return res
                .status(200)
                .json({message:'Qualification created successfully',data:qualification});
        }
    }
}

export const updateQualification = async (req: Request, res: Response, next: express.NextFunction) => {
    const id: any = req.query.id;
    if(req.body){
        const qualification = await Qualification.update({ ...req.body }, { where: { idcompany: id } });
        return res.status(200).json({message:'Qualification updated successfully',data:qualification});
    }
}