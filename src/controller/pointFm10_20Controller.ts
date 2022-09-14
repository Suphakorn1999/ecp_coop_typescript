import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';

import { Fm10_20_coop } from '../models/fm10_20coopModel';
import { Answerfm10_20 } from '../models/answer10_20Model';
import { Question } from '../models/questionModel';

export const getFm10_20detail: RequestHandler = async (req, res, next) => {
  const fm20: Array<any> = await Connection.query(
    `SELECT c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",a.answer)),"]") AS FM10_20 
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON m.idmeeting = f.idmeeting
    LEFT JOIN answerfm10_20 a ON f.idfm10_20_coop = a.idfm10_20_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 4
    GROUP BY f.idfm10_20_coop
    `,
    { type: QueryTypes.SELECT },
  );

  fm20.forEach(async (fm20) => {
    fm20.student = JSON.parse(fm20.student);
    fm20.FM10_20 = JSON.parse(fm20.FM10_20);
  });

  return res.status(200).json({
    message: 'Fm10_20point fetched successfully',
    data: fm20,
  });
};

export const getFm10_20coop: RequestHandler = async (req, res, next) => {
  const fm10_20coop: Array<any> = await Connection.query(
    `SELECT m.idmeeting,c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("prename",s.prename_student,"fname",s.fname_student,"lname",s.lname_student,"name_branch",b.name_branch)),"]") 
    AS student FROM student s GROUP BY sc.idcompany ) AS student
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON m.idmeeting = f.idmeeting
    LEFT JOIN answerfm10_20 a ON f.idfm10_20_coop = a.idfm10_20_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 4
    GROUP BY f.idfm10_20_coop`,
    { type: QueryTypes.SELECT },
  );

  fm10_20coop.forEach(async (fm10_20coop) => {
    fm10_20coop.student = JSON.parse(fm10_20coop.student);
  });

  return res
    .status(200)
    .json({ message: 'Fm10_14coop fetched successfully', data: fm10_20coop });
};

export const createFm10_20: RequestHandler = async (req, res, next) => {
  const All = await Fm10_20_coop.findAll({
    where: { idstudent: req.body.idmeeting },
  });

  if (All.length > 0) {
    const fm10_20coop = await Fm10_20_coop.update(
      { ...req.body },
      { where: { idstudent: req.body.idmeeting } },
    );
    return res.status(200).json({
      message: 'Fm10_20coop updated successfully',
      data: fm10_20coop,
    });
  } else {
    const fm10_20coop = await Fm10_20_coop.create({ ...req.body });
    return res.status(200).json({
      message: 'Fm10_20coop created successfully',
      data: fm10_20coop,
    });
  }
};

export const getquestionfm10_20: RequestHandler = async (req, res, next) => {
  const questionfm10_20 = await Question.findAll({ where: { idform: 4 } });
  return res.status(200).json({
    message: 'questionfm10_20 fetched successfully',
    data: questionfm10_20,
  });
};
