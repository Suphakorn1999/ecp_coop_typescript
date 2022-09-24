import { RequestHandler } from 'express';
import express from 'express';
import { Student } from '../models/studentModel';
import { Year } from '../models/YearModel';
import { Branch } from '../models/branchModel';
import { Factory } from '../models/factoryModel';
import { Role } from '../models/roleModel';
import Connection from '../config/config';
import { QueryTypes } from 'sequelize';
export const createExcleStudent: RequestHandler = async (req,res,next: express.NextFunction) => {
  const jsondata = req.body;
  var values:any[] = [];
  var dataStudent = jsondata.data;

    for (var i = 0; i < dataStudent.length; i++) {
        if (typeof dataStudent[i].studentId != "number") {
            return res.status(400).json({ message: 'StudentId is not a number' });
        }
        let studentid = dataStudent[i].studentId;
        let firstNameThai = dataStudent[i].firstNameThai?dataStudent[i].firstNameThai.replaceAll(" ", ""):null;
        let lastNameThai = dataStudent[i].lastNameThai?dataStudent[i].lastNameThai.replaceAll(" ", ""):null;
        values.push([studentid, firstNameThai, lastNameThai]);
    }

    for (var i = 0; i < values.length; i++) {
        await Student.create(values[i]);
    }

    return res
        .status(200)
        .json({ message: 'Students created successfully'});
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
export const getAllStudent: RequestHandler = async (req, res, next) => {
    const students = await Connection.query(
      'SELECT s.idstudent,s.student_id,s.prename_student,s.fname_student,s.lname_student,CONCAT(y.term,"/",y.year) AS year,b.name_branch,f.name_factory,s.status FROM student s LEFT JOIN year y ON s.idyear = y.idyear LEFT JOIN branch b ON s.idbranch = b.idbranch LEFT JOIN factory f ON b.idfactory = f.idfactory',
      { type: QueryTypes.SELECT },
    );
    // const students = await Student.findAll({include : [{model: Year},{model: Branch,include : [{model: Factory}]}]});
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

    const students: Student | null = await Student.findByPk(id,{include : [{model: Year},{model: Branch,include : [{model: Factory}]}],attributes:['student_id','prename_student','fname_student','lname_student','status']});

    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
        
}
export const updateStudent: RequestHandler = async (req, res, next) => {
    const id: any = req.query.id;
    const student: Student | null = await Student.findByPk(id);
    if (!student) {
        return res.status(400).json({ message: 'Student not found' });
    }
    const updatedStudent = await student.update(req.body);
    return res
        .status(200)
        .json({ message: 'Student updated successfully', data: updatedStudent });
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
    const students: Student | null = await Student.findByPk(id,{attributes:['prename_student','fname_student','lname_student','status']});
    return res
        .status(200)
        .json({ message: 'Student fetched successfully', data: students });
}
export const getStudentByStudentId: RequestHandler = async (req, res, next) => {
    const id: any = req.body.StudentId;
    const students: Student | null = await Student.findOne({where:{student_id:id},include : [{model: Year},{model: Branch,include : [{model: Factory}]}],attributes:['student_id','prename_student','fname_student','lname_student','status']});
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
