import express from 'express';
import { RequestHandler } from 'express';
import fs from 'fs';
const CryptoJS = require('crypto-js');
import dotenv from 'dotenv';
dotenv.config();

export const downloadFile: RequestHandler = async (req,res,next: express.NextFunction) => {
    const namefile = req.query.file;
    if(namefile == null){
        return res.status(400).json({message: 'File not found'});
    }
    let name = CryptoJS.AES.decrypt(namefile, process.env.HEX).toString(CryptoJS.enc.Utf8);
    const file = fs.createReadStream('public/uploads/' + name);
    // res.setHeader('Content-disposition', 'attachment; filename=' + req.query.file);
    res.setHeader('Content-type', 'application/pdf');
    file.pipe(res);
}