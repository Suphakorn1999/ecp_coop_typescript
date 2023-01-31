import { RequestHandler } from 'express';
import express from 'express';
import { Student_Company } from '../models/student_companyModel';
import { Student } from '../models/studentModel';
import { Company } from '../models/companyModel';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';

export const createStudentCompany: RequestHandler = async (req, res, next: express.NextFunction) => {
    const All3 = await Student_Company.findAll({where: { idstudent: req.body.idstudent}});

    if (All3.length > 0) {
        const update = await Student_Company.update({idcompany: req.body.idcompany}, {where: { idstudent: req.body.idstudent}});
        res.status(200).json({
            message: 'Student Company Updated',
            update: update,
        });
    }else{
       const student_company = await Student_Company.create({ ...req.body });
       if (student_company) {
         return res
           .status(200)
           .json({ message: 'Student Company created successfully' });
       }
    }
}

export const getAllStudentCompany: RequestHandler = async (req:any, res, next) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';

    const student_company: Array<any> = await Connection.query(
      `SELECT s.idstudent,c.idcompany,s.student_id,s.prename_student,s.fname_student,s.lname_student,y.term,y.year,c.name_company 
      FROM student s 
      LEFT JOIN student_company st ON s.idstudent = st.idstudent 
      LEFT JOIN company c ON st.idcompany = c.idcompany 
      JOIN year y ON s.idyear = y.idyear 
      where s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%' or c.name_company like '%${search_name}%'
      ORDER BY y.year ASC, y.term ASC,s.idstudent ASC
      limit ${limit} offset ${offset}
      `,
      { type: QueryTypes.SELECT },
    );   
    
    return res.status(200).json({
      message: 'Student Companies fetched successfully',
      data: student_company,
    });
    
}

export const getStudentCompany: RequestHandler = async (req, res, next) => {
     const student: Array<any> = await Connection.query(
      `SELECT 
      CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student,"term",y.term,"year",y.year)),"]") AS STUDENT
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      where c.idcompany = ${req.query.id}
      GROUP BY sc.idcompany
      `,
      { type: QueryTypes.SELECT },
    );

    student.forEach((item) => {
      item.STUDENT = JSON.parse(item.STUDENT);
    })
    
    return res
        .status(200)
        .json({message:'Meeting fetched successfully',data:student});
}