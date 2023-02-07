import { Admin } from './../models/adminModel';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
import { Student } from '../models/studentModel';
import { Teacher } from '../models/teacherModel';
dotenv.config();
const CryptoJS = require('crypto-js');

function generateToken(json: any) {
  const secretKey: any = process.env.secretKey;

  const options: SignOptions = {
    expiresIn: '24h',
  };
  return sign(json, secretKey, options);
}

function verifyToken(req: any, res: any, next: express.NextFunction) {
  const authHeader: any = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (authHeader.split(' ')[0] != 'Bearer') {
    return res.status(403).json('Not Bearer');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const secretKey: any = process.env.secretKey;

  try {
    const decoded = verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Failed to authenticate token.' });
  }
}

function verifyTokenAdmin(req: any, res: any, next: express.NextFunction) {
  const authHeader: any = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (authHeader.split(' ')[0] != 'Bearer') {
    return res.status(403).json('Not Bearer');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const secretKey: any = process.env.secretKey;

  try {
    const decoded:any = verify(token, secretKey);
    let decrypt = CryptoJS.AES.decrypt(decoded.id,process.env.secretKey,).toString(CryptoJS.enc.Utf8);
    const admin = Admin.findAll({
      where: { idadmin: decrypt },
    });
    if(admin == null){
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }else{
      req.body.user = decoded;
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: 'Failed to authenticate token.' });
  }
}

function verifyTokenStudent(req: any, res: any, next: express.NextFunction) {
  const authHeader: any = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (authHeader.split(' ')[0] != 'Bearer') {
    return res.status(403).json('Not Bearer');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const secretKey: any = process.env.secretKey;

  try {
    const decoded: any = verify(token, secretKey);
    let decrypt = CryptoJS.AES.decrypt(decoded.username_student, process.env.secretKey,).toString(CryptoJS.enc.Utf8);
    const student = Student.findAll({where: {username_student: decrypt}})
    if(student == null){
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }else{
      req.body.user = decoded;
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: 'Failed to authenticate token.' });
  }
}

function verifyTokenTeacher(req: any, res: any, next: express.NextFunction) {
  const authHeader: any = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (authHeader.split(' ')[0] != 'Bearer') {
    return res.status(403).json('Not Bearer');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const secretKey: any = process.env.secretKey;

  try {
    const decoded: any = verify(token, secretKey);
    let decrypt = CryptoJS.AES.decrypt(decoded.username_teacher, process.env.secretKey,).toString(CryptoJS.enc.Utf8);
    const teacher = Teacher.findAll({where: {username_teacher: decrypt}})
    if(teacher == null){
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }else{
      req.body.user = decoded;
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: 'Failed to authenticate token.' });
  }
}


module.exports = { generateToken, verifyToken, verifyTokenAdmin, verifyTokenStudent, verifyTokenTeacher };
