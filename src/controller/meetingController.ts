import express from 'express';
import { RequestHandler } from 'express';
import { QueryTypes } from 'sequelize';
import Connection from '../config/config';
import { Company } from '../models/companyModel';
import { Meeting } from '../models/meetingModel';
import { Teacher } from '../models/teacherModel';
import { Student } from './../models/studentModel';

export const createMeeting: RequestHandler = async (req, res, next:express.NextFunction) => {
      const ALLmeeting = await Meeting.findAll({
        where: {
          idstudent_company: req.body.idstudent_company,
          idteacher: req.body.idteacher,
        }
      })

      if (ALLmeeting.length > 0) {
        res.status(400).json({ message: 'Meeting already exists' });
      }
      else {
    const meeting = await Meeting.create({...req.body});
    if(meeting){
        return res.status(200).json({ message: 'Meeting created successfully' });
    }
  }
}

export const getMeeting: RequestHandler = async (req:any, res, next) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const search_name = req.query.search ? req.query.search : '';
    const meeting: Array<any> = await Connection.query(
      `SELECT m.idmeeting,sc.idstudent_company,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS student,
      y.term,y.year,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,c.name_company,p.name_province,m.name_project,m.startdate,m.enddate
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      WHERE s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%' OR t.firstname_teacher LIKE '%${search_name}%' OR t.lastname_teacher LIKE '%${search_name}%' 
      GROUP BY y.idyear
      limit ${limit} offset ${offset}
      `,
      { type: QueryTypes.SELECT },
    );
    meeting.forEach((item) => {
      item.student = JSON.parse(item.student);
    })
    return res
        .status(200)
        .json({message:'Meeting fetched successfully',data:meeting});
}

export const getMeetingById: RequestHandler = async (req, res, next) => {
    const meeting: Array<any> = await Connection.query(
      `SELECT sc.idstudent_company,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS student,
      y.term,y.year,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,c.name_company,p.name_province,m.name_project,m.startdate,m.enddate
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      WHERE m.idmeeting = ${req.params.id}
      GROUP BY y.idyear`,
      { type: QueryTypes.SELECT },
    );
    meeting.forEach((item) => {
      item.student = JSON.parse(item.student);
    })
    return res
        .status(200)
        .json({message:'Meeting fetched successfully',data:meeting});
}

export const updateMeeting: RequestHandler = async (req, res, next) => {
    const meeting = await Meeting.update({...req.body}, { where: { idmeeting: req.params.id } });
    if (meeting) {
      return res.status(200).json({ message: 'Meeting updated successfully' });
    }
}

export const deleteMeeting: RequestHandler = async (req, res, next) => {
    const meeting = await Meeting.destroy({ where: { idmeeting: req.params.id } });
    if (meeting) {
      return res.status(200).json({ message: 'Meeting deleted successfully' });
    }
}

