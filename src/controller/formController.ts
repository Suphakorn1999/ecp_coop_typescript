import express from 'express';
import { RequestHandler } from 'express';
import { Form } from '../models/formModel';

export const createForm: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const form = await Form.create({ ...req.body });

  return res
    .status(200)
    .json({ message: 'form created successfully', data: form });
};

export const getAllForm: RequestHandler = async (req, res, next) => {
  const AllForm = await Form.findAll({
    where: { status_form: 'active' },
    order: [['idform', 'ASC']],
  });

  return res
    .status(200)
    .json({ message: 'form fetched successfully', data: AllForm });
};

export const getFormById: RequestHandler = async (req, res, next) => {
    const id: any = req.query.id;
    
    const form: Form | null = await Form.findByPk(id);
    
    return res
        .status(200)
        .json({ message: 'form fetched successfully', data: form });
};

export const updateform: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
    const id: any = req.query.id;
    const form = await Form.update({ ...req.body }, { where: { idform: id } });
    if (form) {
        return res.status(200).json({ message: 'form updated successfully' });
    }
};

export const deleteForm: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
    const id: any = req.query.id;
    const form = await Form.update({ status_form: 'inactive' }, { where: { idform: id } });
    if (form) {
        return res.status(200).json({ message: 'form deleted successfully' });
    }
};
