import { RequestHandler } from 'express';
import express from 'express';
import { Student } from '../models/studentModel';
import { Year } from '../models/YearModel';
import { Branch } from '../models/branchModel';
import { Factory } from '../models/factoryModel';
import { Role } from '../models/roleModel';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
import { Study_group } from '../models/study_groupModel';
import { Enroll } from '../models/enrollModel';

export const createExcleStudent: RequestHandler = async (req, res, next: express.NextFunction) => {
    const jsondata = req.body;
    var values: any[] = [];
    var dataStudent: any[] = jsondata.data;

    dataStudent.forEach(async e => {
        let student_id = e.studentID;
        let idrole = 1
        let prename_student = e.prename_student ? e.prename_student.replaceAll(" ", "") : null;
        let fname_student = e.firstNameThai ? e.firstNameThai.replaceAll(" ", "") : null;
        let lname_student = e.lastNameThai ? e.lastNameThai.replaceAll(" ", "") : null;
        let year = e.year;
        let term = e.term;
        let idbranch = e.branch;
        let idstudy_group = e.study_group;
        let idyear = null;
        values.push({ student_id, idrole, prename_student, fname_student, lname_student, year, term, idbranch, idstudy_group, idyear })
    })
    var data: any[] = [];

    for (const e of values) {
        const yearId = await Year.findAll({ where: { year: e.year, term: e.term } });
        const branchId = await Branch.findAll({ where: { name_branch: e.idbranch } });
        const study_groupId = await Study_group.findAll({ where: { name_study_group: e.idstudy_group } });
        e.idyear = yearId[0].idyear
        e.idbranch = branchId[0].idbranch
        e.idstudy_group = study_groupId[0].idstudy_group
        let student_id = e.student_id;
        let idrole = 1
        let prename_student = e.prename_student
        let fname_student = e.fname_student
        let lname_student = e.lname_student
        let idyear = e.idyear;
        let idbranch = e.idbranch;
        let idstudy_group = e.idstudy_group;
        data.push({ student_id, idrole, prename_student, fname_student, lname_student, idyear, idbranch, idstudy_group })
    }

    const student = await Student.bulkCreate(data);

    if (student) {
        return res
            .status(200)
            .json({ message: 'Students created successfully' });
    }
};
export const createOneStudent: RequestHandler = async (req,res,next: express.NextFunction) => {
    req.body.idrole = 1;
    let term = req.body.year.split('/')[0];
    let year = req.body.year.split('/')[1];
    
    const yearId = await Year.findAll({where:{year:year,term:term}});
    const branchId = await Branch.findAll({
      where: { name_branch: req.body.branch },
    });

    if(yearId.length > 0){
        req.body.idyear = yearId[0].idyear;
    }else{
        return res.status(400).json({ message: 'Year not found' });
    }

    const Allstudent = await Student.findAll({where:{student_id: req.body.student_id,idyear:req.body.idyear}});

    if(Allstudent.length > 0){
        return res.status(400).json({ message: 'StudentId is already exist' });
    }

    if(branchId.length > 0){
        req.body.idbranch = branchId[0].idbranch;
    }

    const student = await Student.create({...req.body});

    if(student){
        return res
        .status(200)
        .json({ message: 'Student created successfully', data: student });
    }
}
export const getAllStudent: RequestHandler = async (req:any, res, next) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const search_name = req.query.search ? req.query.search : '';

    const students = await Connection.query(
      `SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,
      CONCAT(y.term,"/",y.year) AS year,sg.name_study_group,b.name_branch,f.name_factory,e.grade,e.status_file
      FROM student s 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN study_group sg ON s.idstudy_group = sg.idstudy_group
      where s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%'
      order by s.idstudent desc
      limit ${limit} offset ${offset}`,
      { type: QueryTypes.SELECT },
    );

    return res
        .status(200)
        .json({ message: 'Students fetched successfully', data: students });
}
export const getAllStudentByYear: RequestHandler = async (req, res, next) => {
    const id = req.query.idyear;
    if(!id){
        return res.status(400).json({ message: 'idyear is required' });
    }
    const students = await Student.findAll({where: {idyear: id}});
    return res
        .status(200)
        .json({ message: 'Students fetched successfully', data: students });
}
export const getStudentById: RequestHandler = async (req, res, next) => {
    const id: any = req.query.id;

    const students: Student | null = await Student.findByPk(id,{include : [{model: Year},{model: Branch,include : [{model: Factory}]},{model:Study_group}],attributes:['idstudent','student_id','prename_student','fname_student','lname_student']});

    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
        
}
export const updateStudent: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const student = await Student.findAll({where:{idstudent: id}});
    if(student.length > 0){
        await Student.update({...req
            .body}, { where: { idstudent: id } });
        return res
            .status(200)
            .json({ message: 'Student updated successfully' });
    }else{
        return res.status(400).json({ message: 'Student not found' });
    }
}
export const deleteStudent: RequestHandler = async (req, res, next) => {
    const id: any = req.body.id;
    const students: Student | null = await Student.findByPk(id);
    if(students){
        await Student.destroy({where: {idstudent: id}});
        return res
            .status(200)
            .json({ message: 'Student deleted successfully', data: students });
    }else{
        return res
            .status(400)
            .json({ message: 'Student not found' });
    }
}
export const getStudentByToken: RequestHandler = async (req, res, next) => {
    const id: any = req.body.user.id;
    const students: Student | null = await Student.findByPk(id,{attributes:['prename_student','fname_student','lname_student']});
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
}
export const getStudentByStudentId: RequestHandler = async (req, res, next) => {
    const id: any = req.query.StudentId;
    const students: Student | null = await Student.findOne({where:{student_id:id},include : [{model: Year},{model: Branch,include : [{model: Factory}]},{model:Study_group}],attributes:['idstudent','student_id','prename_student','fname_student','lname_student','status']});
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
}
export const updateStudentByStudentId: RequestHandler = async (req, res, next) => {
    const id: any = req.body.StudentId;
    const student: Student | null = await Student.findOne({where:{student_id:id}});
    if (!student) {
        return res.status(400).json({ message: 'Student not found' });
    }
    const updatedStudent = await student.update({
        idrole : 1,
        idbranch : req.body.idbranch,
        username_student : req.body.username_student,
    });
    return res
        .status(200)
        .json({ message: 'Student updated successfully', data: updatedStudent });
}
export const getsummarizeStudent: RequestHandler = async (req:any, res, next) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const search_name = req.query.search ? req.query.search : '';

    const students = await Connection.query(
     `SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,
      CONCAT(y.term,"/",y.year) AS year,
      sg.name_study_group,b.name_branch,f.name_factory,e.grade,e.status_file,
      CONCAT("[",GROUP_CONCAT(JSON_OBJECT("name_activity",a.name_activity,"status_activity",ac.status_activity)),"]") AS student,
      fm.total_score AS FM10_14,fm18.total_score AS FM10_18,fm20.total_score AS FM10_20
      FROM student s 
      LEFT JOIN enroll e ON s.idstudent = e.idstudent
      LEFT JOIN year y ON e.idyear = y.idyear 
      LEFT JOIN branch b ON s.idbranch = b.idbranch 
      LEFT JOIN factory f ON b.idfactory = f.idfactory 
      LEFT JOIN study_group sg ON s.idstudy_group = sg.idstudy_group
      LEFT JOIN activity_student ac ON s.idstudent = ac.idstudent
      LEFT JOIN activity a ON ac.idactivity = a.idactivity
      LEFT JOIN student_company sc ON s.idstudent = sc.idstudent
      LEFT JOIN fm10_14_coop fm ON sc.idstudent_company = fm.idstudent_company
      LEFT JOIN fm10_18_coop fm18 ON sc.idstudent_company = fm18.idstudent_company
      LEFT JOIN fm10_20_coop fm20 ON sc.idstudent_company = fm20.idstudent_company
      where s.fname_student like '%${search_name}%' or s.lname_student like '%${search_name}%' or s.student_id like '%${search_name}%' or s.prename_student like '%${search_name}%'
      GROUP BY s.idstudent
      ORDER BY s.idstudent ASC
      LIMIT ${limit} OFFSET ${offset}`,
        { type: QueryTypes.SELECT },
    );

    students.forEach((student:any) => {
        student.student = JSON.parse(student.student)
    })


    return res
        .status(200)
        .json({ message: 'Students fetched successfully', data: students }); 
}
export const updateStatusfile: RequestHandler = async (req:any, res, next) => {
    const id: any = req.body.idstudent;
    const student: Student | null = await Student.findByPk(id);
    if (!student) {
        return res.status(400).json({ message: 'Student not found' });
    }else{
        await Enroll.update({status_file: req.body.status_file}, { where: { idstudent: id } });
        return res
            .status(200)
            .json({ message: 'Student updated successfully' });
    }
}
