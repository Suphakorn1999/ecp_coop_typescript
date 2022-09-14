import express from 'express';
import { RequestHandler } from 'express';
import { Role } from '../models/roleModel';

export const createRole: RequestHandler = async (req,res,next: express.NextFunction,) => {
    const role = await Role.findAll({
        where: { name: req.body.name }
    });
    
    if (role.length > 0) {
        await Role.update({ ...req.body },{ where: { name: req.body.name } });
        return res.status(200).json({ message: 'Role updated successfully' });
    }
    
    const roles = await Role.create({ ...req.body });
    
    return res
        .status(200)
        .json({ message: 'Role created successfully', data: roles });
}