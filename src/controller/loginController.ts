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
      res.redirect(`http://localhost:3000/gettoken?token=${token}`);
    }else{
      res.redirect(`http://localhost:3000/register?id=${data.studentId[0]}&username_student=${data.uid[0]}`);
    }
  } else if (data.title[0] == 'Teachers') {
    let idrole:number = 0
    let idbranch:number = 0

    const role: Role[] = await Role.findAll({where: { name: data.title[0] }});
    if (role.length > 0) {
      idrole = role[0].idrole;
    }

    let name_branch = data.program[0].replace('สาขาวิชา', '');

    const branch = await Branch.findAll({
      where: { name_branch: name_branch },
    });
    if (branch.length > 0) {
      idbranch = branch[0].idbranch;
    }

    const teacher: Teacher[] = await Teacher.findAll({
      where: { username_teacher: data.uid[0] },
    });

    if (teacher.length > 0) {
      let token = generateToken({ id: teacher[0].idteacher });
      res.redirect(`http://localhost:3000/gettoken?token=${token}`);
    } else {
      await Teacher.create({
        prename_teacher: data.prename[0],
        firstname_teacher: data.firstNameThai[0],
        lastname_teacher: data.lastNameThai[0],
        username_teacher: data.uid[0],
        idrole: idrole || null,
        idbranch: idbranch || null,
      });
      let token = generateToken({ id: data.uid[0] });
      res.redirect(`http://localhost:3000/gettoken?token=${token}`);
    }
  } 
});
};
