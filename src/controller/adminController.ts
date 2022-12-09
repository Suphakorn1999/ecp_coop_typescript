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
            const token = generateToken({
              idrole: admin.idrole,
              user: admin.name,
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
