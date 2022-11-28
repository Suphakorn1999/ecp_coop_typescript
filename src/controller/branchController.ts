import express from 'express';
import { RequestHandler } from 'express';
import { Factory } from '../models/factoryModel';
import { Branch} from '../models/branchModel';
const { Op } = require('sequelize');

export const createBranch: RequestHandler = async (req,res,next: express.NextFunction) => {
    const Allbranch = await Branch.findAll({
      where: { name_branch: req.body.name_branch },
    });
    const Allfactory = await Factory.findAll({where: {idfactory: req.body.idfactory}});

    if (Allfactory.length === 0) {
      return res.status(400).json({ message: 'ไม่พบคณะนี้' });
    }

    if (Allbranch.length > 0) {
    return res.status(400).json({ message: 'ชื่อสาขามีอยู่แล้ว' });
    }

    const branch = await Branch.create({ ...req.body });
    
    if(branch){
      return res.status(200).json({ message: 'Branch created successfully' });
    }
}

export const updateBranch: RequestHandler = async (req, res, next: express.NextFunction) => {
    const id: any = req.query.id;
    const branch = await Branch.update({ ...req.body }, { where: { idbranch: id } });
    if (branch) {
        return res.status(200).json({ message: 'Branch updated successfully' });
    }
}

export const deleteBranch: RequestHandler = async (req, res, next: express.NextFunction) => {
    const id: any = req.query.id;
    const branch = await Branch.update({ status: 'inactive' }, { where: { idbranch: id } });
    if (branch) {
        return res.status(200).json({ message: 'Branch deleted successfully' });
    }
}

export const getAllBranch: RequestHandler = async (req: any, res, next) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';

    const Allbranches = await Branch.findAll({
        include: [{
            model: Factory,
            as: 'factory',
        }],
        offset: offset,
        limit: limit,
        where: { [Op.or]: [{ name_branch: { [Op.like]: `%${search_name}%` } }, { '$factory.name_factory$': { [Op.like]: `%${search_name}%` } }] },
    });
    return res
        .status(200)
        .json({ message: 'Branches fetched successfully', data: Allbranches });
}