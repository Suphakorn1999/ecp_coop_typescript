import express from 'express';
import { RequestHandler } from 'express';

export const logout: RequestHandler = async (req,res,next: express.NextFunction) => {
    res.redirect('http://localhost:3000/');
}