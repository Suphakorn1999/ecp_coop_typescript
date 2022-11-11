import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';

import { Fm10_20_coop } from '../models/fm10_20coopModel';
import { Answerfm10_20 } from '../models/answer10_20Model';
import { Question } from '../models/questionModel';

export const getFm10_20detail: RequestHandler = async (req, res, next) => {
  const fm20: Array<any> = await Connection.query(
    `SELECT m.idmeeting,c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
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
    GROUP BY f.idfm10_20_coop,sc.idcompany
    `,
    { type: QueryTypes.SELECT },
  );

  const fm20_student: Array<any> = await Connection.query(
    `SELECT m.idmeeting,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("student_id",s.student_id,"prename_student",s.prename_student,"fname_student",s.fname_student,"lname_student",s.lname_student)),"]") AS student
      FROM student s 
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
      LEFT JOIN teacher t ON m.idteacher = t.idteacher 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN province p ON c.idprovince = p.idprovince 
      LEFT JOIN year y ON s.idyear = y.idyear
      GROUP BY y.idyear
    `,
    { type: QueryTypes.SELECT },
  );

  fm20.forEach(async (fm20) => {
    fm20_student.forEach(async (fm20_student) => {
      if (fm20.idmeeting == fm20_student.idmeeting) {
        fm20.FM10_20 = JSON.parse(fm20.FM10_20);
        fm20_student.student = JSON.parse(fm20_student.student);
        fm20.student = fm20_student.student;
      }
    });
  });

  return res.status(200).json({
    message: 'Fm10_20point fetched successfully',
    data: fm20,
  });
};

export const getFm10_20coop: RequestHandler = async (req, res, next) => {
  const fm10_20coop: Array<any> = await Connection.query(
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

export const createFm10_20point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_20;
    var idfm10_20_coop = jsondata.idfm10_20_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_20_coop, idquestion, answer, note });
    }
    const fm10_20coop = await Fm10_20_coop.findAll({ where: { idfm10_20_coop: idfm10_20_coop } });

    if (fm10_20coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_20.findAll({
          where: {
            idfm10_20_coop: values[i].idfm10_20_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_20.create({
              idfm10_20_coop: values[i].idfm10_20_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
              note: values[i].note,
            });
          } else {
            await Answerfm10_20.update(
              { answer: values[i].answer,
                note: values[i].note },
              {
                where: {
                  idfm10_20_coop: values[i].idfm10_20_coop,
                  idquestion: values[i].idquestion,
                },
              },
            );
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_20point created Or updated successfully'});
}

export const createFm10_20coop: RequestHandler = async (req, res, next) => {
    const Allfm10_20 = await Fm10_20_coop.findAll({where: {idmeeting: req.body.idmeeting}});
    if (Allfm10_20.length > 0) {
        return res.status(400).json({ message: 'Fm10_20coop already exists' });
    }
    else {
        const fm10_20coop = await Fm10_20_coop.create({...req.body});
        return res.status(200).json({message: 'Fm10_20coop created successfully', data: fm10_20coop});
    }
}