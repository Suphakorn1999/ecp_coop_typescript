import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';

import { Fm10_20_coop } from '../models/fm10_20coopModel';
import { Answerfm10_20 } from '../models/answer10_20Model';
import { Question } from '../models/questionModel';

export const getFm10_20detail: RequestHandler = async (req, res, next) => {
  const fm20: Array<any> = await Connection.query(
    `SELECT f.idfm10_20_coop,c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS FM10_20 
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_20 a ON f.idfm10_20_coop = a.idfm10_20_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 4 AND f.idstudent_company = ${req.query.idstudent_company} || f.idstudent_company IS NULL
    GROUP BY f.idfm10_20_coop,sc.idcompany
    `,
    { type: QueryTypes.SELECT },
  );


  fm20.forEach(async (fm20) => {  
        fm20.FM10_20 = JSON.parse(fm20.FM10_20);  
  });

  return res.status(200).json({
    message: 'Fm10_20point fetched successfully',
    data: fm20,
  });
};

export const getFm10_20coop: RequestHandler = async (req, res, next) => {
  const fm10_20coop: Array<any> = await Connection.query(
    `SELECT c.name_company,c.address,c.tel,
    t.prename_teacher,t.firstname_teacher,t.lastname_teacher,s.prename_student,s.fname_student,s.lname_student,b.name_branch
    AS student
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_20_coop f ON sc.idstudent_company = f.idstudent_company
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
    .json({ message: 'Fm10_20coop fetched successfully', data: fm10_20coop });
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
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_20point created successfully'});
}

export const createFm10_20coop: RequestHandler = async (req, res, next) => {
    const Allfm10_20 = await Fm10_20_coop.findAll({where: {idstudent_company: req.body.idstudent_company}});
    if (Allfm10_20.length > 0) {
        return res.status(400).json({ message: 'Fm10_20coop already exists' });
    }
    else {
        const fm10_20coop = await Fm10_20_coop.create({...req.body});
        return res.status(200).json({message: 'Fm10_20coop created successfully', data: fm10_20coop});
    }
}

export const updateFm10_20point: RequestHandler = async (req, res, next) => {
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
          }
          else {
            await Answerfm10_20.update({
              answer: values[i].answer,
              note: values[i].note,
            }, {
              where: {
                idfm10_20_coop: values[i].idfm10_20_coop,
                idquestion: values[i].idquestion,
              },
            });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_20point updated successfully'});
}