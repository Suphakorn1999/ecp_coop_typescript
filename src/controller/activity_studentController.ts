import express from 'express';
import { RequestHandler } from 'express';
import { Activity_Student } from '../models/activity_studentModel';
import { Activity } from '../models/activityModel';
import { Student } from '../models/studentModel';
import Connection from '../config/config';
import { QueryTypes } from 'Sequelize';
export const createActivityStudent: RequestHandler = async (req, res, next:express.NextFunction) => {
    const activity = await Activity_Student.findAll({
      where: { idstudent: req.body.idstudent, idactivity: req.body.idactivity },
    });
    if (activity.length > 0) {
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

export const getActivityStudent: RequestHandler = async (req, res, next) => {
      const activity_student: Array<any> = await Connection.query(
        `SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,
        CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idactivity",a.idactivity,"name",a.name_activity,"status",ac.status_activity)ORDER BY a.idactivity ASC),"]") AS ACTIVITY 
        FROM student s 
        LEFT JOIN activity_student ac ON s.idstudent = ac.idstudent 
        LEFT JOIN activity a ON a.idactivity = ac.idactivity 
        JOIN year y ON s.idyear = y.idyear 
        group by s.idstudent 
        `,
        { type: QueryTypes.SELECT },
      );

      activity_student.forEach(async (activity_student) => {
        activity_student.ACTIVITY = JSON.parse(activity_student.ACTIVITY);
        if(activity_student.ACTIVITY[0].name == null){
          activity_student.ACTIVITY = [];
        }
      })

    return res.status(200).json({
      message: 'Activity Student fetched successfully',
      data: activity_student,
    });
};