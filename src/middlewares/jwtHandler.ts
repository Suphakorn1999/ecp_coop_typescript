import { Admin } from './../models/adminModel';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

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
    const admin = Admin.findByPk(decoded.idrole);
    if(admin == null){
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }else{
      return res.status(200).json({ message: 'Success to authenticate token.' });
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
    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Failed to authenticate token.' });
  }
}


module.exports = { generateToken, verifyToken, verifyTokenAdmin, verifyTokenStudent };
