import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';

import { Fm10_18_coop } from '../models/fm10_18coopModel';
import { Answerfm10_18 } from '../models/answer10_18Model';
import { Question } from '../models/questionModel';
import { Student_Company } from '../models/student_companyModel';
import { Form } from '../models/formModel';


export const getquestion10_18: RequestHandler = async (req, res, next) => {
    const question10_18 = await Question.findAll({where:{idform:3}});
    return res
        .status(200)
        .json({
            message: 'question fetched successfully',
            data: question10_18,
        });
}

export const getFm10_18detail: RequestHandler = async (req, res, next) => {
  const fm18: Array<any> = await Connection.query(
    `SELECT 
    (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student,
    c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.createdAt,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",a.answer)),"]") AS FM10_18
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_18 a ON f.idfm10_18_coop = a.idfm10_18_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 3
    GROUP BY f.idfm10_18_coop
    `,
    { type: QueryTypes.SELECT },
  );

  fm18.forEach(async (fm18) => {
    fm18.student = JSON.parse(fm18.student);
    fm18.FM10_18 = JSON.parse(fm18.FM10_18);
  });

  return res.status(200).json({
    message: 'Fm10_20point fetched successfully',
    data: fm18,
  });
};

export const getFm10_18coop: RequestHandler = async (req, res, next) => {
  const fm10_18coop: Array<any> = await Connection.query(
    `SELECT (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student,
    c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_18 a ON f.idfm10_18_coop = a.idfm10_18_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 3
    GROUP BY sc.idstudent_company`,
    { type: QueryTypes.SELECT },
  );

  fm10_18coop.forEach(async (fm10_18coop) => {
    fm10_18coop.student = JSON.parse(fm10_18coop.student);
  });

  return res
    .status(200)
    .json({ message: 'Fm10_14coop fetched successfully', data: fm10_18coop });
};