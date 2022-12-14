import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Fm10_11_coop } from '../models/fm10_11coopModel';
import { Answerfm10_11 } from '../models/answer10_11Model';
import { Question } from '../models/questionModel';

export const getFm10_11_coop: RequestHandler = async (req, res) => {
    const fm10_11coop: Array<any> = await Connection.query(
    `SELECT c.name_company,c.address,c.tel,t.prename_teacher,t.firstname_teacher,t.lastname_teacher,
    s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,f.createdAt,f.updatedAt
    FROM student s 
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN year y ON s.idyear = y.idyear
    LEFT JOIN branch b ON s.idbranch = b.idbranch
    LEFT JOIN company c ON sc.idcompany = c.idcompany
    LEFT JOIN factory fa ON b.idfactory = fa.idfactory
    GROUP BY s.idyear,sc.idstudent_company`,
    { type: QueryTypes.SELECT },
  );

  fm10_11coop.forEach(async (fm10_11coop) => {
    fm10_11coop.student = JSON.parse(fm10_11coop.student);
  });

  return res
    .status(200)
    .json({ message: 'Fm10_11coop fetched successfully', data: fm10_11coop });
}

export const getquestionfm10_11_part1: RequestHandler = async (req, res) => {
    const question = async (idquestion:any) => {
      return await Connection.query(
      `SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"id",q.idsub_question,"topic",q.name_question)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where q.idsub_question = ${idquestion}`,
     {
        type: QueryTypes.SELECT,
      },
    );
    }
    const fm11: Array<any> = await Connection.query(
      `SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 53 OR q.idquestion = 57 OR q.idquestion = 64 OR q.idquestion = 66
      OR q.idquestion = 73 OR q.idquestion = 87)
      GROUP BY q.idquestion
      `,
     {
        type: QueryTypes.SELECT,
      },
    );

    for(let h of fm11){
        h.FM10_11 = (await question(h.idquestion))[0]
        h.FM10_11 = JSON.parse(h.FM10_11.FM10_11)
      }

    return res
      .status(200)
      .json({ message: 'question fetched successfully', data: fm11 });

}

export const getquestionfm10_11_part2: RequestHandler = async (req, res) => {
    const question = async (idquestion:any) => {
      return await Connection.query(
      `SELECT CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"id",q.idsub_question,"topic",q.name_question)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where q.idsub_question = ${idquestion}`,
     {
        type: QueryTypes.SELECT,
      },
    );
    }
    const fm11: Array<any> = await Connection.query(
      `SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 88 OR q.idquestion = 96 OR q.idquestion = 97 OR q.idquestion = 98
      OR q.idquestion = 99 OR q.idquestion = 100 OR q.idquestion = 104)
      GROUP BY q.idquestion
      `,
     {
        type: QueryTypes.SELECT,
      },
    );

    for(let h of fm11){
        h.FM10_11 = (await question(h.idquestion))[0]
        h.FM10_11 = JSON.parse(h.FM10_11.FM10_11)
      }

    return res
      .status(200)
      .json({ message: 'question fetched successfully', data: fm11 });
}

export const createFm10_11_coop: RequestHandler = async (req, res) => {
    const fm10_11coopALL = await Fm10_11_coop.findAll({where:{idstudent_company:req.body.idstudent_company}});
    if(fm10_11coopALL.length == 0){
      const fm10_11coop = await Fm10_11_coop.create({...req.body,time:1});
      return res
        .status(201)
        .json({ message: 'Fm10_11coop created successfully', data: fm10_11coop });
    }else if(fm10_11coopALL.length == 1){
      const fm10_11coop = await Fm10_11_coop.create({...req.body,time:2});
      return res
        .status(201)
        .json({ message: 'Fm10_11coop created successfully', data: fm10_11coop });
    }else if(fm10_11coopALL.length == 2){
      return res
        .status(400)
        .json({ message: 'Fm10_11coop created fail', data: null });
    }
}

export const updateFm10_11_coop: RequestHandler = async (req, res) => {
    const fm10_11coop = await Fm10_11_coop.findOne({where:{idfm10_11_coop:req.body.idfm10_11_coop}});
    if(fm10_11coop){
      const fm10_11coop = await Fm10_11_coop.update({...req.body},{where:{idfm10_11_coop:req.body.idfm10_11_coop}});
      return res
        .status(201)
        .json({ message: 'Fm10_11coop updated successfully', data: fm10_11coop });
    }else{
      return res
        .status(400)
        .json({ message: 'Fm10_11coop updated fail', data: null });
    }
}

export const createFm10_11_point: RequestHandler = async (req, res) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_11;
    var idfm10_11_coop = jsondata.idfm10_11_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_11_coop, idquestion, answer, note });
    }

    const fm10_11coop = await Fm10_11_coop.findAll({ where: { idfm10_11_coop: idfm10_11_coop } });

    if (fm10_11coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_11coop not found' }); 
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_11.findAll({
          where: {
            idfm10_11_coop: values[i].idfm10_11_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_11.create({
              idfm10_11_coop: values[i].idfm10_11_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
              note: values[i].note,
            });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_21point created successfully'});
}

export const updateFm10_11point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_11;
    var idfm10_11_coop = jsondata.idfm10_11_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        let note = dataStudent[i].note;
        values.push({ idfm10_11_coop, idquestion, answer, note });
    }

    const fm10_11coop = await Fm10_11_coop.findAll({ where: { idfm10_11_coop: idfm10_11_coop } });

    if (fm10_11coop.length == 0) {
      return res.status(400).json({ message: 'Fm10_21coop not found' }); 
    }
    
    for (var i = 0; i < values.length; i++) {
        await Answerfm10_11.findAll({
          where: {
            idfm10_11_coop: values[i].idfm10_11_coop,
            idquestion: values[i].idquestion,
          },
        }).then(async (data) => {
          if (data.length == 0) {
            await Answerfm10_11.create({
              idfm10_11_coop: values[i].idfm10_11_coop,
              idquestion: values[i].idquestion,
              answer: values[i].answer,
              note: values[i].note,
            });
          }
          else {
            await Answerfm10_11.update({
              answer: values[i].answer,
              note: values[i].note,
            }, {
              where: {
                idfm10_11_coop: values[i].idfm10_11_coop,
                idquestion: values[i].idquestion,
              }
            });
          }
        });
    }
    
    return res.status(200).json({ message: 'Fm10_11point updated successfully'});
}

export const getFm10_11_detailpart1: RequestHandler = async (req, res) => {
  const fm11: Array<any> = await Connection.query(
        `SELECT f.idfm10_11_coop,an.idfm10_11_coop,
        c.name_company,c.name_company_eng,c.address,c.tel,p.name_province,
        s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, y.term, y.year,
        t.prename_teacher, t.firstname_teacher, t.lastname_teacher
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
        LEFT JOIN answerfm10_11 an ON f.idfm10_11_coop = an.idfm10_11_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
        LEFT JOIN teacher t ON m.idteacher = t.idteacher
        where fm.idform = 1 AND s.idstudent = ${req.query.id} AND f.time = '${req.query.time}'
        GROUP BY f.idfm10_11_coop`,
      {
        type: QueryTypes.SELECT,
      },
    );

    const question = async (idfm10_11_coop:any,idquestion:any) => {
      return await Connection.query(
      `SELECT an.idfm10_11_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question,"point",an.answer,"note",an.note)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM answerfm10_11 an
      LEFT JOIN fm10_11_coop f ON an.idfm10_11_coop = f.idfm10_11_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where an.idfm10_11_coop = ${idfm10_11_coop} AND (q.idsub_question = ${idquestion} OR q.idquestion = ${idquestion})`,
      {
        type: QueryTypes.SELECT,
      },
    );
    }
    const fm11_1: Array<any> = await Connection.query(
      `SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 53 OR q.idquestion = 57 OR q.idquestion = 64 OR q.idquestion = 66
      OR q.idquestion = 73 OR q.idquestion = 87)
      GROUP BY q.idquestion
      `,
     {
        type: QueryTypes.SELECT,
      },
    );
    fm11.forEach((e: any) => {
    e.HEADER = fm11_1;
    })

    for(let i of fm11){
      for(let h of i.HEADER){
        h.FM10_11 = (await question(i.idfm10_11_coop,h.idquestion))[0]
        h.FM10_11 = JSON.parse(h.FM10_11.FM10_11)
      }
    }

    return res
      .status(200)
      .json({ message: 'question fetched successfully', data: fm11 });
}

export const getFm10_11_detailpart2: RequestHandler = async (req, res) => {
  const fm11: Array<any> = await Connection.query(
        `SELECT f.idfm10_11_coop,an.idfm10_11_coop,
        c.name_company,c.name_company_eng,c.address,c.tel,p.name_province,
        s.prename_student, s.fname_student, s.lname_student,s.student_id,
        b.name_branch, fa.name_factory, y.term, y.year,
        t.prename_teacher, t.firstname_teacher, t.lastname_teacher
        FROM student s 
        LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
        LEFT JOIN fm10_11_coop f ON sc.idstudent_company = f.idstudent_company
        LEFT JOIN answerfm10_11 an ON f.idfm10_11_coop = an.idfm10_11_coop
        LEFT JOIN question q ON an.idquestion = q.idquestion
        LEFT JOIN form fm ON q.idform = fm.idform
        LEFT JOIN year y ON s.idyear = y.idyear
        LEFT JOIN branch b ON s.idbranch = b.idbranch
        LEFT JOIN company c ON sc.idcompany = c.idcompany
        LEFT JOIN qualification qu ON c.idcompany = qu.idcompany
        LEFT JOIN province p ON c.idprovince = p.idprovince
        LEFT JOIN factory fa ON b.idfactory = fa.idfactory
        LEFT JOIN meeting m ON sc.idstudent_company = m.idstudent_company
        LEFT JOIN teacher t ON m.idteacher = t.idteacher
        where fm.idform = 1 AND s.idstudent = ${req.query.id} AND f.time = '${req.query.time}'
        GROUP BY f.idfm10_11_coop`,
      {
        type: QueryTypes.SELECT,
      },
    );

    const question = async (idfm10_11_coop:any,idquestion:any) => {
      return await Connection.query(
      `SELECT an.idfm10_11_coop,CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"idsub_question",q.idsub_question,"topic",q.name_question,"point",an.answer,"note",an.note)ORDER BY q.idquestion ASC),"]") AS FM10_11
      FROM answerfm10_11 an
      LEFT JOIN fm10_11_coop f ON an.idfm10_11_coop = f.idfm10_11_coop
      LEFT JOIN question q ON an.idquestion = q.idquestion
      LEFT JOIN form fm ON q.idform = fm.idform
      where an.idfm10_11_coop = ${idfm10_11_coop} AND (q.idsub_question = ${idquestion} OR q.idquestion = ${idquestion})`,
      {
        type: QueryTypes.SELECT,
      },
    );
    }

    const fm11_1: Array<any> = await Connection.query(
      `SELECT q.idquestion,q.name_question
      FROM question q
      LEFT JOIN form fm ON q.idform = fm.idform
      where fm.idform = 1 AND (q.idquestion = 88 OR q.idquestion = 96 OR q.idquestion = 97 OR q.idquestion = 98
      OR q.idquestion = 99 OR q.idquestion = 100 OR q.idquestion = 104)
      GROUP BY q.idquestion
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    fm11.forEach((e: any) => {
    e.HEADER = fm11_1;
    })

    for(let i of fm11){
      for(let h of i.HEADER){
        h.FM10_11 = (await question(i.idfm10_11_coop,h.idquestion))[0]
        h.FM10_11 = JSON.parse(h.FM10_11.FM10_11)
      }
    }

    return res
      .status(200)
      .json({ message: 'question fetched successfully', data: fm11 });
}



