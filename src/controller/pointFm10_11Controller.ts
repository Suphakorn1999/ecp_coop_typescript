import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Fm10_11_coop } from '../models/fm10_11coopModel';
import { Answerfm10_11 } from '../models/answer10_11Model';
import { Question } from '../models/questionModel';

export const getFm10_11_coop: RequestHandler = async (req, res) => {
    const fm10_11coop: Array<any> = await Connection.query(
    `SELECT c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON m.idmeeting = f.idmeeting
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    GROUP BY c.idcompany`,
    { type: QueryTypes.SELECT },
  );

  fm10_11coop.forEach(async (fm10_11coop) => {
    fm10_11coop.student = JSON.parse(fm10_11coop.student);
  });

  return res
    .status(200)
    .json({ message: 'Fm10_14coop fetched successfully', data: fm10_11coop });
}

export const getquestionfm10_11: RequestHandler = async (req, res) => {
    const question = await Question.findAll({where: {idform: 1}});
    return res
    .status(200)
    .json({ message: 'question fetched successfully', data: question });
}