import express from 'express';
import { RequestHandler } from 'express';
import { AssignmentFile } from '../models/assignmentFileModel';
import { Enroll } from '../models/enrollModel';
import { Student } from '../models/studentModel';
import { Year } from '../models/YearModel';
const { Op } = require('sequelize');

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
  const id = req.body.user.id
  const date:any = req.query.time
  const student = await Student.findAll({where: { idstudent: id }})
  const year = await Year.findAll({ where: { status_year: 'yes' }})
  const enroll = await Enroll.findAll({ where: { idstudent: id, idyear: year[0].idyear }})

  if (student.length > 0 && enroll.length > 0) {
    const assignment = await AssignmentFile.findAll({
      where: { status_assignment_file: 'active' },
    })
    let data: null[] = []

    assignment.forEach((e: any) => {
      e.start_date = new Date(e.start_date)
      e.end_date = new Date(e.end_date)
      if (e.start_date <= new Date(date) && e.end_date >= new Date(date)) {
        data.push(e)
      } else if (e.start_date == null && e.end_date == null) {
        data.push(null)
      }
    })
    return res
      .status(200)
      .json({ message: 'Assignment get successfully', data: data })
  } else {
    return res
      .status(400)
      .json({ message: 'student is not in the current academic year' })
  }
}

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

export const getAssignmentAdmin: RequestHandler = async (
  req,
  res,
  next: express.NextFunction,
) => {
  const assignment = await AssignmentFile.findAll({where: {status_assignment_file: 'active'}})
  return res
    .status(200)
    .json({ message: 'Assignment get successfully', data: assignment });
}