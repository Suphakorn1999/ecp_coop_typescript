import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Fm10_14_coop } from '../models/fm10_14coopModel';
import { Answerfm10_14 } from '../models/answerModel';
import { Question } from '../models/questionModel';
import { Student_Company } from '../models/student_companyModel';
import { Form } from '../models/formModel';

export const getFm10_14detail: RequestHandler = async (req, res, next) => {
    const fm14: Array<any> = await Connection.query(
    `SELECT f.idfm10_14_coop,fm.name_form,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,f.other_Comments,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS point 
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_14_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_14 a ON f.idfm10_14_coop = a.idfm10_14_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 2 AND f.idstudent_company = ${req.query.idstudent_company}
    GROUP BY f.idfm10_14_coop`,
      { type: QueryTypes.SELECT },
    );

    fm14.forEach(async (fm14) => {
        fm14.point = JSON.parse(fm14.point);
    })

    return res
      .status(200)
      .json({
        message: 'Fm10_14point fetched successfully',
        data: fm14,
      });
}

export const getFm10_14coop: RequestHandler = async (req, res, next) => {
    const fm10_14coop = await Connection.query(
      `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,f.name_factory,
      y.term,y.year,c.name_company,fm.fname_assessor,fm.lname_assessor,fm.position_assessor,
      fm.department_assessor,fm.other_Comments,fm.total_score,fm.createdAt,fm.updatedAt
      FROM student s  
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN year y ON s.idyear = y.idyear 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN fm10_14_coop fm ON sc.idstudent_company = fm.idstudent_company`,
      { type: QueryTypes.SELECT },
    );
    
    return res.status(200).json({ message: 'Fm10_14coop fetched successfully', data: fm10_14coop });
}

export const createFm10_14coop: RequestHandler = async (req, res, next) => {

    const Allfm10_14 = await Fm10_14_coop.findAll({where:{idstudent_company:req.body.idstudent_company}});

    if(Allfm10_14.length > 0){
        return res.status(400).json({ message: 'Fm10_14coop already exists' });
    }else{
        const create = await Fm10_14_coop.create({...req.body});
        return res.status(200).json({ message: 'Fm10_14coop created successfully', data: create });
    }
}

export const createFm10_14point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_14;
    var idfm10_14_coop = jsondata.idfm10_14_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_14_coop, idquestion, answer });
    }
    const fm10_14coop = await Fm10_14_coop.findAll({ where: { idfm10_14_coop : idfm10_14_coop } });

    if (fm10_14coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_14coop not found' });
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_14.findAll({
          where: {
            idfm10_14_coop: values[i].idfm10_14_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_14.create({
              idfm10_14_coop: values[i].idfm10_14_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
            });
          } else {
            return res.status(400).json({ message: 'Answerfm10_14 already exists' });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_14point created successfully'});
}

export const getquestionfm10_14: RequestHandler = async (req, res, next) => {
    const questionfm10_14 = await Question.findAll({where:{idform:2}});
    return res.status(200).json({ message: 'questionfm10_14 fetched successfully', data: questionfm10_14 });
}

export const updateFM10_14point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_14;
    var idfm10_14_coop = jsondata.idfm10_14_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_14_coop, idquestion, answer });
    }
    const fm10_14coop = await Fm10_14_coop.findAll({ where: { idfm10_14_coop : idfm10_14_coop } });

    if (fm10_14coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_14coop not found' });
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_14.findAll({
          where: {
            idfm10_14_coop: values[i].idfm10_14_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            return res.status(400).json({ message: 'Answerfm10_14 not found' });
          } else {
            await Answerfm10_14.update({
              answer: values[i].answer,
            },{
              where: {
                idfm10_14_coop: values[i].idfm10_14_coop,
                idquestion: values[i].idquestion,
              }
            });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_14point updated successfully'});
}

export const updateFm10_14coop: RequestHandler = async (req, res, next) => {
    const fm10_14coop = await Fm10_14_coop.findAll({ where: { idfm10_14_coop : req.query.idfm10_14_coop } });

    if (fm10_14coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_14coop not found' });
    }

    await Fm10_14_coop.update({...req.body
    },{
        where: {
            idfm10_14_coop: req.query.idfm10_14_coop
        }
    });

    return res.status(200).json({ message: 'Fm10_14coop updated successfully'});
    
}