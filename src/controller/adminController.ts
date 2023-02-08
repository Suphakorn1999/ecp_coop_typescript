import express from 'express';
import { RequestHandler } from 'express';
import { Admin } from '../models/adminModel';
import dotenv from 'dotenv';
import { Company } from '../models/companyModel';
import { Student } from '../models/studentModel';
import { Year } from '../models/YearModel';
import { Teacher } from '../models/teacherModel';
dotenv.config();
const CryptoJS = require('crypto-js');
const { generateToken } = require('../middlewares/jwtHandler');
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';

export const createAdmin: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.idrole;

  let passwordencrypt = CryptoJS.AES.encrypt(
    password,
    process.env.secretKey,
  ).toString();

  const admin = await Admin.create({
    idrole: role,
    name: name,
    username: username,
    password: passwordencrypt,
  });

  return res
    .status(200)
    .json({ message: 'Admin created successfully', data: admin });
};

export const loginAdmin: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({
    where: { username: username },
  });
    if (admin) {
        let passworddecrypt = CryptoJS.AES.decrypt(
            admin.password,
            process.env.secretKey,
        ).toString(CryptoJS.enc.Utf8);
        if (passworddecrypt === password) {
          let encodeId = CryptoJS.AES.encrypt(admin.idadmin, process.env.secretKey).toString();
          let encodeuser = CryptoJS.AES.encrypt(admin.name, process.env.secretKey).toString();
            const token = generateToken({
              id: encodeId,
              user: encodeuser,
            });
            return res
              .cookie('token', token)
              .json({ msg: 'Login success', token: token });
        } else {
            return res.status(400).json({
            message: 'Password is incorrect',
            });
        }
        } else {
            return res.status(400).json({
            message: 'Username is incorrect',
            });
        }
};

export const allcount: RequestHandler = async (req, res, next) => {
  const count_company = await Company.count();
  const count_student = await Student.count();
  const count_teacher = await Teacher.count();
  const year = await Year.findAll({where:{status_year:"yes"}});

  return res.status(200).json({
    message: 'Count data',
    data: {
      count_company: count_company,
      count_student: count_student,
      count_teacher: count_teacher,
      year: year,
    },
  });
}

export const gennerateToken: RequestHandler = async (req, res, next) => {
  const token = generateToken({
    id: req.body.id,
    studentId: req.body.studentId,
  });

  return res.status(200).json({
    message: 'Token generated',
    data: {
      token: token,
    },
  });
}

export const conuntWithyear: RequestHandler = async (req, res, next: express.NextFunction) => {
  const dataValues:any[] = [];
  
  const idyear = await Year.findAll();
  for(let i = 0; i < idyear.length; i++){
    const count_student: Array<any> = await Connection.query(`SELECT COUNT(*) 
    FROM student as s 
    INNER JOIN enroll e ON s.idstudent = e.idstudent
    WHERE idyear = ${idyear[i].idyear}`
    , { type: QueryTypes.SELECT });
    dataValues.push({ id: i, year: idyear[i].year, term: idyear[i].term, count_student: count_student})
  }

  return res.status(200).json({
    message: 'Count data',
    data: dataValues,
  });
}
