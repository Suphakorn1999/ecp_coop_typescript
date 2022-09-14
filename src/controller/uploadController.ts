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
