import express from 'express';
import { RequestHandler } from 'express';
import fs from 'fs';


export const downloadFile: RequestHandler = async (req,res,next: express.NextFunction) => {
    const file = fs.createReadStream('public/downloads/' + req.query.file);
    // res.setHeader('Content-disposition', 'attachment; filename=' + req.query.file);
    res.setHeader('Content-type', 'application/pdf');
    file.pipe(res);
}