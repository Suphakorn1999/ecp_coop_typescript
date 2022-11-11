import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Question } from '../models/questionModel';
import { Fm10_21_coop } from '../models/fm10_21coopModel';
import { Answerfm10_21 } from '../models/answer10_21Model';

export const getFm10_21coop: RequestHandler = async (req, res, next) => {
    const fm21: Array<any> = await Connection.query(
      `SELECT s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        GROUP BY f.idfm10_21_coop
        `,
      { type: QueryTypes.SELECT },
    );

    return res.status(200).json({
      message: 'Fm10_21point fetched successfully',
      data: fm21,
    });
    
}

export const getFm10_21detail: RequestHandler = async (req, res, next) => {
    const fm21: Array<any> = await Connection.query(
      `SELECT s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, p.name_province ,p.region,
        qu.job_position , qu.job_description ,qu.job_topic,
        qu.working_hours, qu.compensation ,
        c.name_company, c.address, c.tel,
        c.number_of_employee,
        (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",an.answer)),"]") AS FM20_21_1 FROM question q where q.idsub_question = 31 ORDER BY a.idquestion ASC) AS FM10_21_1,
        (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",an.answer)),"]") AS FM20_21_2 FROM question q where q.idsub_question = 38 ORDER BY a.idquestion ASC) AS FM10_21_2,
        (SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("topic",q.name_question,"point",an.answer)),"]") AS FM20_21_3 FROM question q where q.idsub_question = 45 ORDER BY a.idquestion ASC) AS FM10_21_3
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_21_coop f ON s.idstudent = f.idstudent
        LEFT JOIN answerfm10_21 an ON f.idfm10_21_coop = an.idfm10_21_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        where fm.idform = 5
        GROUP BY f.idfm10_21_coop`,
      {
        type: QueryTypes.SELECT,
      },
    );

    fm21.forEach((item) => {
        item.FM10_21_1 = JSON.parse(item.FM10_21_1);
        item.FM10_21_2 = JSON.parse(item.FM10_21_2);
        item.FM10_21_3 = JSON.parse(item.FM10_21_3);
    })

    return res.status(200).json({
      message: 'Fm10_21point fetched successfully',
      data: fm21,
    });
    
}

export const getquestionfm10_21: RequestHandler = async (req, res, next) => {
  var values: any[] = [];
  const questionfm10_21_1 = await Question.findAll({ where: { idform: 5,idsub_question :31} });
  const questionfm10_21_2 = await Question.findAll({ where: { idform: 5,idsub_question :38} });
  const questionfm10_21_3 = await Question.findAll({ where: { idform: 5,idsub_question :45} });

  values.push(questionfm10_21_1);
  values.push(questionfm10_21_2);
  values.push(questionfm10_21_3);

  return res.status(200).json({
    message: 'Fm10_21point fetched successfully',
    data: values,
  });
  
}

export const createFm10_21point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_21;
    var idfm10_20_coop = jsondata.idfm10_20_coop;

    dataStudent.forEach((item:any) => {
        values.push([item.idquestion,item.answer,item.note]);
    });

    const fm10_21coop = await Fm10_21_coop.findAll({ where: { idfm10_20_coop: idfm10_20_coop } });

    if (fm10_21coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_21coop not found' }); 
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_21.findAll({
          where: {
            idfm10_20_coop: values[i].idfm10_20_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_21.create({
              idfm10_20_coop: values[i].idfm10_20_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
              note: values[i].note,
            });
          } else {
            return res.status(400).json({ message: 'Answerfm10_21 already exists' });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_21point created successfully'});
}

export const createFm10_20coop: RequestHandler = async (req, res, next) => {
    const Allfm10_21 = await Fm10_21_coop.findAll({where: {idstudent: req.body.idstudent}});
    if (Allfm10_21.length > 0) {
        return res.status(400).json({ message: 'Fm10_21coop already exists' });
    }
    else {
        const fm10_21coop = await Fm10_21_coop.create({...req.body});
        return res.status(200).json({message: 'Fm10_20coop created successfully', data: fm10_21coop});
    }
}