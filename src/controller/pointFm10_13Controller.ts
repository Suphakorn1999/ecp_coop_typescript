import express from 'express';
import { RequestHandler } from 'express';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Fm10_13_coop } from '../models/fm10_13coopModel';
import { Answerfm10_13 } from '../models/answer10_13Model';
import { Question } from '../models/questionModel';
import { Student_Company } from '../models/student_companyModel';
import { Form } from '../models/formModel';
import { Teacher } from '../models/teacherModel';
import { Year } from '../models/YearModel';

export const getFm10_13detail: RequestHandler = async (req, res) => {
    const fm13: Array<any> = await Connection.query(
        `SELECT f.idfm10_13_coop,fm.name_form,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,f.idfile,
    f.fname_assessor,f.lname_assessor,f.position_assessor,f.department_assessor,f.report_title_th,f.report_title_en,f.other_Comments,f.createdAt,f.updatedAt,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idquestion",q.idquestion,"topic",q.name_question,"point",a.answer)ORDER BY a.idquestion ASC),"]") AS point
    FROM student s
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN fm10_13_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN form fm ON fm.idform = f.idform
    LEFT JOIN branch b ON b.idbranch = s.idbranch
    LEFT JOIN factory fa ON fa.idfactory = b.idfactory
    LEFT JOIN company c ON c.idcompany = sc.idcompany
    LEFT JOIN answerfm10_13 a ON a.idfm10_13_coop = f.idfm10_13_coop
    LEFT JOIN question q ON q.idquestion = a.idquestion
    WHERE q.idform = 6 AND f.idstudent_company = ${req.query.idstudent_company}
    GROUP BY f.idfm10_13_coop`,
        { type: QueryTypes.SELECT }
    );
    
    fm13.forEach((element: any) => {
        element.point = JSON.parse(element.point)
    })

    return res
        .status(200)
        .json({
            message: 'Fm10_13detail fetched successfully',
            data: fm13,
        });
    
}

export const getFm10_13coop: RequestHandler = async (req, res) => {
    const fm13: Array<any> = await Connection.query(
        `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,f1.idfile,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idfm10_13_coop",f.idfm10_13_coop,"idteacher",t.idteacher,"prename_teacher",t.prename_teacher,"firstname_teacher",t.firstname_teacher,"lastname_teacher",t.lastname_teacher)),"]") AS teacher,
    m.report_title_th,m.report_title_en,f.other_Comments,f.createdAt,f.updatedAt
    FROM student s
    LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN company c ON c.idcompany = sc.idcompany
    LEFT JOIN branch b ON b.idbranch = s.idbranch
    LEFT JOIN factory fa ON fa.idfactory = b.idfactory
    LEFT JOIN enroll e ON s.idstudent = e.idstudent
    LEFT JOIN year y ON e.idyear = y.idyear
    LEFT JOIN fm10_13_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN file f1 ON f1.idfile = f.idfile
    LEFT JOIN meeting m ON m.idstudent_company = sc.idstudent_company
    LEFT JOIN teacher t ON f.idteacher = t.idteacher 
    group by s.idstudent
    ORDER BY f.idfm10_13_coop DESC`,
        { type: QueryTypes.SELECT }
    );

    fm13.forEach(async (element: any) => {
        element.teacher = JSON.parse(element.teacher)
    })

    return res
        .status(200)
        .json({
            message: 'Fm10_13coop fetched successfully',
            data: fm13,
        });

}

export const getFm10_13totalpoint: RequestHandler = async (req, res) => {
    const fm10_13coop = await Connection.query(
    `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,b.name_branch,f.name_factory,
      c.name_company,fm.fname_assessor,fm.lname_assessor,fm.position_assessor,
      fm.department_assessor,fm.report_title_th,fm.report_title_en,fm.other_Comments,fm.createdAt,fm.updatedAt,
      SUM(a.answer) AS point
      FROM student_company sc 
      LEFT JOIN student s ON sc.idstudent = s.idstudent 
      LEFT JOIN company c ON sc.idcompany = c.idcompany 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN fm10_13_coop fm ON sc.idstudent_company = fm.idstudent_company 
      LEFT JOIN answerfm10_13 a ON fm.idfm10_13_coop = a.idfm10_13_coop
      LEFT JOIN question q ON a.idquestion = q.idquestion
      LEFT JOIN form fom ON q.idform = fom.idform
      where q.count_question = 'yes'
      AND q.idform = 6
      GROUP BY sc.idstudent_company`,
        { type: QueryTypes.SELECT },
    );

    return res.status(200).json({ message: 'Fm10_13totalpoint fetched successfully', data: fm10_13coop });
}

export const createFm10_13coop: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.teacher;

    for (var i = 0; i < dataStudent.length; i++) {
        let idstudent_company = dataStudent[i].idstudent_company;
        let idteacher = dataStudent[i].idteacher;
        let idfile = dataStudent[i].idfile;
        let other_Comments = dataStudent[i].other_Comments;
        let createdAt = dataStudent[i].createdAt;
        let updatedAt = dataStudent[i].updatedAt;
        values.push({ idstudent_company, idteacher, idfile, other_Comments, createdAt, updatedAt });
    }

    const fm10_13coop = await Fm10_13_coop.findAll({ where: { idstudent_company: dataStudent[0].idstudent_company } });

    if (fm10_13coop.length == 0) {
        const fm10_13coop = await Fm10_13_coop.bulkCreate(values);
        return res.status(200).json({ message: 'Fm10_13coop created successfully', data: fm10_13coop });
    }

}

export const createFm10_13point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_13;
    var idfm10_13_coop = jsondata.idfm10_13_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_13_coop, idquestion, answer });
    }
    const fm10_13coop = await Fm10_13_coop.findAll({ where: { idfm10_13_coop: idfm10_13_coop } });

    if (fm10_13coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_13coop not found' });
    }

    for (var i = 0; i < values.length; i++) {
        await Answerfm10_13.findAll({
            where: {
                idfm10_13_coop: values[i].idfm10_13_coop,
                idquestion: values[i].idquestion,
            },
        }).then(async (data) => {
            if (data.length == 0) {
                await Answerfm10_13.create({
                    idfm10_13_coop: values[i].idfm10_13_coop,
                    idquestion: values[i].idquestion,
                    answer: values[i].answer,
                });
            } else {
                return res.status(400).json({ message: 'Answerfm10_13 already exists' });
            }
        });
    }

    return res.status(200).json({ message: 'Fm10_13point created successfully' });
}

export const getquestionfm10_13: RequestHandler = async (req, res, next) => {
    const questionfm10_13 = await Question.findAll({ where: { idform: 6 } });
    return res.status(200).json({ message: 'questionfm10_13 fetched successfully', data: questionfm10_13 });
}

export const updateFM10_13point: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent = jsondata.fm10_13;
    var idfm10_13_coop = jsondata.idfm10_13_coop;

    for (var i = 0; i < dataStudent.length; i++) {
        let idquestion = dataStudent[i].idquestion;
        let answer = dataStudent[i].answer;
        values.push({ idfm10_13_coop, idquestion, answer });
    }
    const fm10_13coop = await Fm10_13_coop.findAll({ where: { idfm10_13_coop: idfm10_13_coop } });

    if (fm10_13coop.length == 0) {
        return res.status(400).json({ message: 'Fm10_13coop not found' });
    }

    for (var i = 0; i < values.length; i++) {
        await Answerfm10_13.findAll({
            where: {
                idfm10_13_coop: values[i].idfm10_13_coop,
                idquestion: values[i].idquestion,
            },
        }).then(async (data) => {
            if (data.length == 0) {
                return res.status(400).json({ message: 'Answerfm10_13 not found' });
            } else {
                await Answerfm10_13.update({
                    answer: values[i].answer,
                }, {
                    where: {
                        idfm10_13_coop: values[i].idfm10_13_coop,
                        idquestion: values[i].idquestion,
                    }
                });
            }
        });
    }

    return res.status(200).json({ message: 'Fm10_13point updated successfully' });
}

export const updateFm10_13coop: RequestHandler = async (req, res, next) => {
    const jsondata = req.body;
    var values: any[] = [];
    var data = jsondata.teacher;

    for (var i = 0; i < data.length; i++) {
        let idfm10_13_coop = data[i].idfm10_13_coop;
        let idstudent_company = data[i].idstudent_company;
        let idteacher = data[i].idteacher;
        let idfile = data[i].idfile;
        let other_Comments = data[i].other_Comments;
        let createdAt = data[i].createdAt;
        let updatedAt = data[i].updatedAt;
        values.push({ idfm10_13_coop,idstudent_company, idteacher, idfile, other_Comments, createdAt, updatedAt });
    }


    for (var i = 0; i < values.length; i++) {
        await Fm10_13_coop.update({
            idteacher: values[i].idteacher,
            idfile: values[i].idfile,
            other_Comments: values[i].other_Comments,
            createdAt: values[i].createdAt,
            updatedAt: values[i].updatedAt,
        }, {
            where: {
                idfm10_13_coop: values[i].idfm10_13_coop,
            }
        });
    }

    return res.status(200).json({ message: 'Fm10_13coop updated successfully' });
}

export const getFm10_13coopBytokenteacher: RequestHandler = async (req, res, next) => {
    const idteacher:any = req.body.user.id;
    const idyear: any = req.query.idyear

    const year = await Year.findAll({
        where: { status_year: 'yes' },
    })
    if (idyear === undefined) {
    const fm13: Array<any> = await Connection.query(
    `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,
    b.name_branch,fa.name_factory,c.name_company,f1.idfile,
    CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idfm10_13_coop",f.idfm10_13_coop,"idteacher",t.idteacher,"prename_teacher",t.prename_teacher,"firstname_teacher",t.firstname_teacher,"lastname_teacher",t.lastname_teacher)),"]") AS teacher,
    m.report_title_th,m.report_title_en,f.other_Comments,f.createdAt,f.updatedAt
    FROM student s
    RIGHT JOIN student_company sc ON s.idstudent = sc.idstudent
    LEFT JOIN company c ON c.idcompany = sc.idcompany
    LEFT JOIN branch b ON b.idbranch = s.idbranch
    LEFT JOIN factory fa ON fa.idfactory = b.idfactory
    LEFT JOIN enroll e ON s.idstudent = e.idstudent
    LEFT JOIN year y ON e.idyear = y.idyear
    LEFT JOIN fm10_13_coop f ON sc.idstudent_company = f.idstudent_company
    LEFT JOIN file f1 ON f1.idfile = f.idfile
    RIGHT JOIN meeting m ON m.idstudent_company = f.idstudent_company
    LEFT JOIN teacher t ON m.idteacher = t.idteacher
    WHERE f.idteacher = ${idteacher} AND y.idyear = ${year[0].idyear}
    group by s.idstudent
    ORDER BY f.idfm10_13_coop DESC`,
        { type: QueryTypes.SELECT }
    );

    fm13.forEach(async (element: any) => {
        element.teacher = JSON.parse(element.teacher)
    })

    return res
        .status(200)
        .json({
            message: 'Fm10_13coop fetched successfully',
            data: fm13,
        });
    } else {
        const fm13: Array<any> = await Connection.query(
            `SELECT sc.idstudent_company,s.prename_student,s.fname_student,s.lname_student,s.student_id,
            b.name_branch,fa.name_factory,c.name_company,f1.idfile,
            CONCAT("[",GROUP_CONCAT(JSON_OBJECT("idfm10_13_coop",f.idfm10_13_coop,"idteacher",t.idteacher,"prename_teacher",t.prename_teacher,"firstname_teacher",t.firstname_teacher,"lastname_teacher",t.lastname_teacher)),"]") AS teacher,
            m.report_title_th,m.report_title_en,f.other_Comments,f.createdAt,f.updatedAt
            FROM student s
            RIGHT JOIN student_company sc ON s.idstudent = sc.idstudent
            LEFT JOIN company c ON c.idcompany = sc.idcompany
            LEFT JOIN branch b ON b.idbranch = s.idbranch
            LEFT JOIN factory fa ON fa.idfactory = b.idfactory
            LEFT JOIN enroll e ON s.idstudent = e.idstudent
            LEFT JOIN year y ON e.idyear = y.idyear
            LEFT JOIN fm10_13_coop f ON sc.idstudent_company = f.idstudent_company
            LEFT JOIN file f1 ON f1.idfile = f.idfile
            RIGHT JOIN meeting m ON m.idstudent_company = f.idstudent_company
            LEFT JOIN teacher t ON m.idteacher = t.idteacher
            WHERE f.idteacher = ${idteacher} AND y.idyear = ${idyear}
            group by s.idstudent
            ORDER BY f.idfm10_13_coop DESC`,
            { type: QueryTypes.SELECT }
        );

        fm13.forEach(async (element: any) => {
            element.teacher = JSON.parse(element.teacher)
        })

        return res
            .status(200)
            .json({
                message: 'Fm10_13coop fetched successfully',
                data: fm13,
            });
    }
}