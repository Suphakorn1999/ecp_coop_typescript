import express from 'express';
import { RequestHandler } from 'express';
import { QueryTypes } from 'sequelize';
import Connection from '../config/config';
import { Company } from '../models/companyModel';
import { Meeting } from '../models/meetingModel';
import { Teacher } from '../models/teacherModel';
import { Student } from './../models/studentModel';

export const createMeeting: RequestHandler = async (req, res, next:express.NextFunction) => {
    if (req.body.startdate || req.body.enddate) {
      const meeting = await Meeting.update(
        { startdate: req.body.startdate, enddate: req.body.enddate },
        { where: { idstudent: req.body.idstudent } },
      );
      if(meeting){
      return res.status(200).json({
          message: 'Meeting updated successfully',
        });
      }
    }
    
    const meeting = await Meeting.create({...req.body});
    if(meeting){
        return res.status(200).json({ message: 'Meeting created successfully' });
    }
    
}

export const getMeeting: RequestHandler = async (req, res, next) => {
    const meeting: Array<any> = await Connection.query(
      `SELECT 
      CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS STUDENT,
      y.term,y.year,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,c.name_company,p.name_province,m.name_project,m.startdate,m.enddate 
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company 
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      GROUP BY sc.idcompany`,
      { type: QueryTypes.SELECT },
    );
    meeting.forEach((item) => {
      item.STUDENT = JSON.parse(item.STUDENT);
    })
    return res
        .status(200)
        .json({message:'Meeting fetched successfully',data:meeting});
}