import express from 'express';
import { RequestHandler } from 'express';

export const logout: RequestHandler = async (req,res,next: express.NextFunction) => {
    if (req.query.msg == 'logoutByTeacher'){
        res.redirect('https://teacher-ecpcoop.ddns.net/login');
    }
    res.redirect('https://ecp-coop.ddns.net/');
}

