import { RequestHandler } from 'express';
import express, { Express, Request, Response } from 'express';
import { File } from '../models/fileModel';
import multer from 'multer';
import path from 'path';
import moment from 'moment';
import { tz } from 'moment-timezone';
import { Student } from '../models/studentModel';
import dotenv from 'dotenv';
import { AssignmentFile } from '../models/assignmentFileModel';
const fs = require('fs');
dotenv.config();
const datenow = moment().tz('Asia/Bangkok').format('DD-MM-YYYY');
const time = moment().tz('Asia/Bangkok').format('HH:mm:ss');

export const uploadfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  const UserId = req.body.user.id;
  const student: Student[] = await Student.findAll({
    where: { idstudent: UserId },
  });
  if(!req.query.id){
    return res.status(400).json({ message: 'id is required' });
  }
  if (student.length > 0) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage }).array('file');
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      const data: any = req.files;
      if (data) {
        data.forEach(async (file: any, index: number) => {
          if (index != 0) {
            return;
          }
          const filess = await File.create({
            idstudent: UserId,
            idassignmentFile: req.query.id,
            name_file: file.originalname,
            path_file: file.path,
            type_file: file.mimetype,
            date_file: time + ' ' + datenow,
          });
          if (filess) {
            return res.status(200).json({ message: 'Upload file success' });
          }
        });
      } else {
        return res.status(400).json({ message: 'File not found' });
      }
    });
  } else {
    return res.status(500).json({ message: 'User not found' });
  }
};

export const downloadFile: RequestHandler = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  const namefile = req.query.file;
  if (namefile == null) {
    return res.status(400).json({ message: 'File not found' });
  }
  const file = path.join(__dirname, '../public/uploads/' + namefile);
  res.setHeader('Content-disposition', 'attachment; filename=' + req.query.file);
  res.setHeader('Content-type', 'application/pdf');
  res.download(file);
}

export const getFile: RequestHandler = async (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => {
  const id = req.body.user.id;
  const file = await File.findAll({
    where: { idstudent: id },
    attributes: [
      'idfile',
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



