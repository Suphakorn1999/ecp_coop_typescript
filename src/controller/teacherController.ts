import { RequestHandler } from 'express';
import express from 'express';
import { Teacher } from '../models/teacherModel';
import { Branch } from '../models/branchModel';
import { Factory } from '../models/factoryModel';
const { Op } = require('sequelize');

export const createTeacher: RequestHandler = async (req,res,next: express.NextFunction) => {
    req.body.idrole = 2
    if(req.body.branch){
        const branchId = await Branch.findAll({
            where: { name_branch: req.body.branch },
        });
        if(branchId.length > 0){
            req.body.idbranch = branchId[0].idbranch;
        }else{
            return res.status(400).json({ message: 'Branch not found' });
        }
    }
  const Allteacher = await Teacher.findAll({ where: { prename_teacher: req.body.prename_teacher, firstname_teacher: req.body.firstname_teacher, lastname_teacher: req.body.lastname_teacher } });

  if (Allteacher.length > 0) {
    return res.status(400).json({ message: 'มีชื่ออาจารย์อยู่แล้ว' });
  }

    const teacher = await Teacher.create({...req.body});
    
    
    if(teacher){
      return res.status(200).json({ message: 'Teacher created successfully' });
    }
}

export const getAllTeacher: RequestHandler = async (req:any, res, next) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const search_name = req.query.search ? req.query.search : '';

  const Allteachers = await Teacher.findAll({
    include: [
      {
        model: Branch,
        include: [{ model: Factory }],
      },
    ],
    attributes: ['idteacher', 'prename_teacher', 'firstname_teacher', 'lastname_teacher','username_teacher','status_teacher'],
    offset: offset,
    limit: limit,
    where: {
        [Op.or]: [
            { firstname_teacher: { [Op.like]: `%${search_name}%` } },
            { lastname_teacher: { [Op.like]: `%${search_name}%` } },
        ],
    }
  });
  return res.status(200).json({ message: 'Teachers fetched successfully', data: Allteachers });
};

export const updateTeacher: RequestHandler = async (req, res, next) => {
    const teacher = await Teacher.findAll(req.body.id);
    if (teacher) {
        await Teacher.update(
          { ...req.body },
          { where: { idteacher: req.body.id } },
        );
        return res.status(200).json({message:'Teacher updated successfully'});
    }
    return res.status(400).json({message:'Teacher not found'})
}