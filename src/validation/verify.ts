import express from 'express';
import { RequestHandler } from 'express';
import { Company } from '../models/companyModel';
import { Activity_Student } from '../models/activity_studentModel';

export const verify: RequestHandler = async (req,res,next: express.NextFunction) => {
    const data:Company = {...req.body}
    const typecompany = ["Software", "Hardware", "Network"]

    const Verifynull = () => {
        return (
          data.name_company === null ||
          data.name_company_eng === null ||
          data.address === null ||
          data.idprovince === null ||
          data.tel === null ||
          data.email === null ||
          data.detail_company === null ||
          data.number_of_employee === null ||
          data.fname_manager === null ||
          data.lname_manager === null ||
          data.rank === null ||
          data.department === null ||
          data.website === null ||
          !typecompany.includes(data.type_company_1) 
        );
    }

    
    const Verifybank = () => {
        return (
          data.name_company.trim() == '' ||
          data.name_company_eng.trim()  == '' ||
          data.address.trim() == '' ||
          data.tel.trim() == '' ||
          data.email.trim() == '' ||
          data.detail_company.trim() == '' ||
          data.number_of_employee.trim() == '' ||
          data.fname_manager.trim() == '' ||
          data.lname_manager.trim() == '' ||
          data.rank.trim() == '' ||
          data.department.trim() == '' ||
          data.website.trim() == ''
        );
    }

    if (!Verifynull()) {
        if(!Verifybank()) {
            next();
        }else{
            return res.status(400).json({message:'Please fill in the blank'});
        }
    }else{
        return res.status(400).json({message:'Please check the data not null'});
    }

}

export const verifyActivity: RequestHandler = async (req,res,next: express.NextFunction) => {
    const data: Activity_Student = { ...req.body };
    const statusactivity = ['pass', 'progress', 'fail']

    const Verifynull = () => {
        return (
        data.idstudent === null ||
        data.idactivity === null ||
        !statusactivity.includes(data.status_activity))
    }

    const Verifybank = () => {
        return (
        data.status_activity.trim() == '')
    }


    if (!Verifynull()) {
        if(!Verifybank()) {
            next();
        }else{
            return res.status(400).json({message:'Please fill in the blank'});
        }
    }else{
        return res.status(400).json({message:'Please check the data not null or status activity not pass, progress, fail'});
    }
}

