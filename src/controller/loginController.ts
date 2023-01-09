import { Branch } from './../models/branchModel';
import express from 'express';
import { RequestHandler } from 'express';
import { Student } from '../models/studentModel';
const { generateToken } = require('../middlewares/jwtHandler');
const XmlRpcService = require('../services/xmlrpc');
import dotenv from 'dotenv';
import { Role } from '../models/roleModel';
import { Teacher } from '../models/teacherModel';
dotenv.config();
const CryptoJS = require('crypto-js');
export const login: RequestHandler = async (req,res,next: express.NextFunction,) => {
  let attribs: any = req.query.attribs;
  attribs = XmlRpcService.decryptxml(attribs);
  attribs.then(async (data: any) => {
  data = JSON.stringify(data);
  data = JSON.parse(data);
  data = data.replaceAll("'", '"');
  data = JSON.parse(data);
 
  if (data.title[0] == 'Students') {
    const student = await Student.findAll({
      where: { username_student: data.uid[0]},
    });
 
    if (student.length > 0) {
      let encodeId = CryptoJS.AES.encrypt(data.studentId[0],process.env.secretKey).toString();
      let token = generateToken({
        id: student[0].idstudent,
        studentId: encodeId,
      });
      res.redirect(`https://ecp-coop.ddns.net/gettoken?token=${token}`);
    }else{
      res.redirect(`https://ecp-coop.ddns.net/register?id=${data.studentId[0]}&username_student=${data.uid[0]}`);
    }
  } else if (data.title[0] == 'Teachers') {
    const teacher = await Teacher.findAll({
      where: { username_teacher: data.uid[0]},
    });
    if (teacher.length > 0) {
      let token = generateToken({
        id: teacher[0].idteacher,
      });
      res.redirect(`http://127.0.0.1:5173/gettoken?token=${token}`);
    }else{
      res.redirect(`http://127.0.0.1:5173/register?prename=${data.prename}&firstNameThai=${data.firstNameThai}&lastNameThai=${data.lastNameThai}&username_teacher=${data.uid[0]}`);
    }
  } 
});
};
