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



