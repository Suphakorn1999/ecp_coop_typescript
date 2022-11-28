import express, { Express, Request, Response } from 'express';
import { RequestHandler } from 'express';
import { AssignmentFile } from '../models/assignmentFileModel';
import { File } from '../models/fileModel';
import { Student } from '../models/studentModel';
const fs = require('fs');
import path from 'path';
const { Op } = require('sequelize');

export const getFile: RequestHandler = async (req, res, next) => {
    const id = req.body.user.id
    const file = await File.findAll({where:{idstudent:id},
      attributes: [
        'idfile',
        'idassignmentFile',
        'name_file',
        'path_file',
        'type_file',
        'date_file',
      ],
      include: [
        {
          model: Student,
          attributes: [
            'student_id',
            'prename_student',
            'fname_student',
            'lname_student',
          ],
        },
        { model: AssignmentFile },
      ],
    });
    if (file.length > 0) {
        return res.status(200).json({ message: 'File fetched successfully', data: file });
    } else {
        return res.status(400).json({ message: 'File not found' });
    }
}

export const deleteFile: RequestHandler = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  const namefile = req.query.name_file;
  if (namefile == null) {
    return res.status(400).json({ message: 'Name File not found' });
  }
  const absolutePath:string = path.resolve('public/uploads/' + namefile);

  if(fs.existsSync(absolutePath)) {
    File.destroy({
      where: { name_file: namefile },
    })
      .then((result) => {
        if (result) {
          fs.unlinkSync(absolutePath);
          return res.status(200).json({ message: 'Delete file success' });
        } else {
          return res.status(400).json({ message: 'Delete file fail' });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: 'Delete file fail' });
      });
  } else {
    return res.status(400).json({ message: 'File not found' });
  }
}

export const getFileformadmin: RequestHandler = async (
  req: any,
  res: Response,
  next: express.NextFunction,
) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const search_name = req.query.search ? req.query.search : '';

  const file = await File.findAll({
    attributes: [
      'idfile',
      'idassignmentFile',
      'name_file',
      'path_file',
      'type_file',
      'date_file',
    ],
    include: [
      {
        model: Student,
        attributes: [
          'student_id',
          'prename_student',
          'fname_student',
          'lname_student',
        ],
        as: 'student',
      },
      { model: AssignmentFile },
    ],
    where: {
      [Op.or]: [
        { '$student.fname_student$': { [Op.like]: '%' + search_name + '%' } },
        { '$student.lname_student$': { [Op.like]: '%' + search_name + '%' } },
        { 'name_file': { [Op.like]: '%' + search_name + '%' } },
      ]
    },
    offset: offset,
    limit: limit,
    order: [['date_file', 'DESC']],
  });
  if (file.length > 0) {
    return res.status(200).json({ message: 'File fetched successfully', data: file });
  }
}

