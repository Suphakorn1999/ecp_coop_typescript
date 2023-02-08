import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Fm10_18_coop } from '../models/fm10_18coopModel';
import { Answerfm10_18 } from '../models/answer10_18Model';
import { Question } from '../models/questionModel';
import { Student_Company } from '../models/student_companyModel';
import { Form } from '../models/formModel';
import { Year } from '../models/YearModel';


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
    `SELECT f.idfm10_18_coop,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,
    fa.name_factory,c.name_company,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS FM10_18
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN answerfm10_18 a ON f.idfm10_18_coop = a.idfm10_18_coop
    LEFT JOIN question q ON a.idquestion = q.idquestion
    LEFT JOIN form fm ON q.idform = fm.idform
    LEFT JOIN enroll e ON s.idstudent = e.idstudent
    LEFT JOIN year y ON e.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE q.idform = 3 AND f.idstudent_company = ${req.query.idstudent_company}
    GROUP BY f.idfm10_18_coop 
    `,
    { type: QueryTypes.SELECT },
  );

  fm18.forEach(async (fm18) => {
    fm18.FM10_18 = JSON.parse(fm18.FM10_18);
  });

  return res.status(200).json({
    message: 'Fm10_18point fetched successfully',
    data: fm18,
  });
};

export const getFm10_18coop: RequestHandler = async (req:any, res, next) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const search_name = req.query.search ? req.query.search : '';
  const idyear = req.query.idyear
  if (idyear === undefined && search_name === ''){
    const year = await Year.findAll({ where: { status_year: 'yes' } });
    if(year.length > 0){
      const fm10_18coop: Array<any> = await Connection.query(
    `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,fa.name_factory,
    y.term,y.year,c.name_company,f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.total_score,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN enroll e ON s.idstudent = e.idstudent
    LEFT JOIN year y ON e.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%' OR c.name_company LIKE '%${search_name}%' 
    ORDER BY f.createdAt DESC
    LIMIT ${limit} OFFSET ${offset}`,
        { type: QueryTypes.SELECT },
      );


      return res
        .status(200)
        .json({ message: 'Fm10_18coop fetched successfully', data: fm10_18coop });
    }
  }else if(idyear != undefined){
    const fm10_18coop: Array<any> = await Connection.query(
      `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,fa.name_factory,
    y.term,y.year,c.name_company,f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.total_score,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN enroll e ON s.idstudent = e.idstudent
    LEFT JOIN year y ON e.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE (s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%' OR c.name_company LIKE '%${search_name}%') AND y.idyear = ${idyear}
    ORDER BY f.createdAt DESC
    LIMIT ${limit} OFFSET ${offset}`,
      { type: QueryTypes.SELECT },
    );


    return res
      .status(200)
      .json({ message: 'Fm10_18coop fetched successfully', data: fm10_18coop });
  } else if (search_name != '' && idyear === undefined){
    const fm10_18coop: Array<any> = await Connection.query(
      `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,fa.name_factory,
    y.term,y.year,c.name_company,f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,
    f.strength_1,f.strength_2,f.strength_3,f.strength_4,
    f.improvement_1,f.improvement_2,f.improvement_3,f.improvement_4,
    f.get_into_work,f.other_comments,f.total_score,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_18_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN enroll e ON s.idstudent = e.idstudent
    LEFT JOIN year y ON e.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    WHERE s.fname_student LIKE '%${search_name}%' OR s.lname_student LIKE '%${search_name}%' OR s.student_id LIKE '%${search_name}%' OR c.name_company LIKE '%${search_name}%' 
    ORDER BY f.createdAt DESC
    LIMIT ${limit} OFFSET ${offset}`,
      { type: QueryTypes.SELECT },
    );


    return res
      .status(200)
      .json({ message: 'Fm10_18coop fetched successfully', data: fm10_18coop });
  }
  
};

export const createFm10_18point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_18;
    var idfm10_18_coop = jsondata.idfm10_18_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_18_coop, idquestion, answer });
    }
    const fm10_18coop = await Fm10_18_coop.findAll({ where: { idfm10_18_coop: idfm10_18_coop } });

    if (fm10_18coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_18.findAll({
          where: {
            idfm10_18_coop: values[i].idfm10_18_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_18.create({
              idfm10_18_coop: values[i].idfm10_18_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
            });
          } else {
            return res.status(400).json({ message: 'Fm10_18point already exists' });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_18point created successfully'});
}

export const createFm10_18coop: RequestHandler = async (req, res, next) => {
    const Allfm10_18 = await Fm10_18_coop.findAll({where: {idstudent_company: req.body.idstudent_company}});
    if (Allfm10_18.length > 0) {
        return res.status(400).json({ message: 'Fm10_18coop already exists' });
    }
    else {
        const fm10_18coop = await Fm10_18_coop.create({...req.body});
        return res.status(200).json({message: 'Fm10_18coop created successfully', data: fm10_18coop});
    }
}

export const updateFm10_18coop: RequestHandler = async (req, res, next) => {
    const fm10_18coop = await Fm10_18_coop.findAll({where: {idfm10_18_coop: req.query.idfm10_18_coop}});
    if (fm10_18coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_18coop not found' });
    }
    else {
        await Fm10_18_coop.update({...req.body}, {where: {idfm10_18_coop: req.query.idfm10_18_coop}});
        return res.status(200).json({message: 'Fm10_18coop updated successfully'});
    }
}

export const updateFm10_18point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_18;
    var idfm10_18_coop = jsondata.idfm10_18_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_18_coop, idquestion, answer });
    }
    const fm10_18coop = await Fm10_18_coop.findAll({ where: { idfm10_18_coop: idfm10_18_coop } });

    if (fm10_18coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_20coop not found' });
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_18.findAll({
          where: {
            idfm10_18_coop: values[i].idfm10_18_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_18.create({
              idfm10_18_coop: values[i].idfm10_18_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
            });
          } else {
            await Answerfm10_18.update({answer: values[i].answer}, {where: {idfm10_18_coop: values[i].idfm10_18_coop, idquestion: values[i].idquestion}});
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_18point updated successfully'});
}
