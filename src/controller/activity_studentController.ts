import express from 'express';
import { RequestHandler } from 'express';
import { Activity_Student } from '../models/activity_studentModel';
import { Activity } from '../models/activityModel';
import { Student } from '../models/studentModel';
import Connection from '../config/config';
import { QueryTypes } from 'Sequelize';
import { Year } from '../models/YearModel';
import { Activity_Year } from '../models/activity_yearModel';

export const createActivityStudent: RequestHandler = async (req, res, next:express.NextFunction) => {
  const activity = await Activity_Student.findAll({
    where: { idstudent: req.body.idstudent, idactivity: req.body.idactivity },
  });
  if (activity) {
    return res.status(400).json({ message: 'นักศึกษามีกิจกรรมนี้อยู่แล้ว' });
  }
  const activityStudent = await Activity_Student.create({ ...req.body });
  if (activityStudent) {
    return res.status(200).json({ message: 'Activity created successfully' });
  }
}

export const updateActivityStudent: RequestHandler = async (req, res, next:express.NextFunction) => {
    const activity = await Activity_Student.update(
      { ...req.body },
      {
        where: {
          idstudent: req.body.idstudent,
          idactivity: req.body.idactivity,
        },
      },
    );
    if (activity) {
      return res.status(200).json({ message: 'Activity updated successfully' });
    }
}

export const deleteActivityStudent: RequestHandler = async (req, res, next:express.NextFunction) => {
    const activity = await Activity_Student.destroy({
      where: { idactivity_student: req.body.id },
    });
    if (activity) {
      return res.status(200).json({ message: 'Activity deleted successfully' });
    }
}

export const getActivityStudent: RequestHandler = async (req: any, res, next) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const search_name = req.query.search ? req.query.search : '';
  const year = await Year.findAll({ where: { status_year: 'yes' } });
  if (year.length > 0 && req.query.idyear == undefined) {
    const activity_year = await Activity_Year.findAll({ where: { idyear: year[0].idyear } });
    if (activity_year.length > 0) {
      const activity_student: Array<any> = await Connection.query(
        `SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,
        CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idactivity",a.idactivity,"name",a.name_activity,"status",ac.status_activity)ORDER BY a.idactivity ASC),"]") AS ACTIVITY 
        FROM student s 
        LEFT JOIN activity_student ac ON s.idstudent = ac.idstudent 
        LEFT JOIN activity a ON a.idactivity = ac.idactivity 
        LEFT JOIN enroll e ON s.idstudent = e.idstudent
        LEFT JOIN year y ON e.idyear = y.idyear
        LEFT JOIN activity_year ay ON ay.idactivity = a.idactivity
        WHERE (s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%') AND e.idyear = ${year[0].idyear}
        group by s.idstudent
        limit ${limit} offset ${offset}`,
        { type: QueryTypes.SELECT },
      );

      activity_student.forEach((activity_student) => {
        activity_student.ACTIVITY = JSON.parse(activity_student.ACTIVITY);
      })

      return res.status(200).json({
        message: 'Activity Student fetched successfully',
        data: activity_student,
      });
    } else {
      return res.status(200).json({
        message: 'Activity Student fetched successfully',
        data: [],
      });
    }

  } else if (year.length > 0 && req.query.idyear != undefined) {
    const activity_year = await Activity_Year.findAll({ where: { idyear: req.query.idyear } });
    if (activity_year.length > 0) {
      const activity_student: Array<any> = await Connection.query(
        `SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,
        CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idactivity",a.idactivity,"name",a.name_activity,"status",ac.status_activity)ORDER BY a.idactivity ASC),"]") AS ACTIVITY 
        FROM student s 
        LEFT JOIN activity_student ac ON s.idstudent = ac.idstudent 
        LEFT JOIN activity a ON a.idactivity = ac.idactivity 
        LEFT JOIN enroll e ON e.idstudent = s.idstudent
        LEFT JOIN year y ON e.idyear = y.idyear
        LEFT JOIN activity_year ay ON ay.idactivity = a.idactivity AND ay.idyear = y.idyear
        WHERE (s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%') AND ay.idyear = ${req.query.idyear}
        group by s.idstudent
        limit ${limit} offset ${offset}
        `,
        { type: QueryTypes.SELECT },
      );

      activity_student.forEach((activity_student) => {
        activity_student.ACTIVITY = JSON.parse(activity_student.ACTIVITY);
      })

      return res.status(200).json({
        message: 'Activity Student fetched successfully',
        data: activity_student,
      });
    } else {
      return res.status(200).json({
        message: 'Activity Student fetched successfully',
        data: [],
      });
    }
  }
};