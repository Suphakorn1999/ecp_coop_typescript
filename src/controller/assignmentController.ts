import express from 'express';
import { RequestHandler } from 'express';
import { AssignmentFile } from '../models/assignmentFileModel';

export const createAssignment: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {

  const name = req.body.name;

  const assignmentAll = await AssignmentFile.findAll({
    where: { name_assignment_file: name },
  });

  if (assignmentAll.length > 0) {
    res.status(400).json({ message: 'Assignment already exists' });
  } else {
    const assignment = await AssignmentFile.create({
      name_assignment_file: name,
    });

    return res
      .status(200)
      .json({ message: 'Assignment created successfully', data: assignment });
  }
};

export const getAssignment: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const assignment = await AssignmentFile.findAll();
  return res
    .status(200)
    .json({ message: 'Assignment get successfully', data: assignment });
};

export const getAssignmentById: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const id: any = req.query.id;
  const assignment: AssignmentFile | null = await AssignmentFile.findByPk(id);
  return res
    .status(200)
    .json({ message: 'Assignment get successfully', data: assignment });
};

export const updateAssignment: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const id: any = req.query.id;
  const assignment = await AssignmentFile.update(
    { ...req.body },
    { where: { idassignment_file: id } },
  );
  if (assignment) {
    return res.status(200).json({ message: 'Assignment updated successfully' });
  }
};

export const deleteAssignment: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const id: any = req.query.id;
  const assignment = await AssignmentFile.update(
    { status_assignment_file: 'inactive' },
    { where: { idassignment_file: id } },
  );
  if (assignment) {
    return res.status(200).json({ message: 'Assignment deleted successfully' });
  }
};
