import { Qualification } from './../models/qualificationModel';
import express from 'express';
import { RequestHandler } from 'express';
import { Company } from '../models/companyModel';
import { Province } from '../models/provinceModel';
const compantdata = require('../services/company');
export const createCompany: RequestHandler = async (req,res,next: express.NextFunction) => {
    const province = await Province.findAll({where: {name_province: req.body.name_province}});
    if(province.length > 0){
      req.body.idprovince = province[0].idprovince;
    }else{
      return res.status(400).json({ message: 'ไม่พบจังหวัดนี้' });
    }

    const company = await Company.create({...req.body});                                    
    return res
        .status(200)
        .json({message:'Company created successfully',data:company});
};

export const getAllCompany: RequestHandler = async (req:any, res:any, next) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  
  const company = await Company.findAll({include: [{model: Province},{model: Qualification}],offset:offset,limit:limit});

  return res
    .status(200)
    .json({ message: 'Companies fetched successfully', data: company });
};

export const getCompanyById: RequestHandler = async (req, res, next) => {
  const id: any = req.query.id;

  const companies: Company | null = await Company.findByPk(id,{include : [{model: Province},{model: Qualification}]});

  return res
    .status(200)
    .json({ message: 'Company fetched successfully', data: companies });
};

export const updateCompanyById: RequestHandler = async (req, res, next) => {
  const id: any = req.query.id;

  const companies: Company | null = await Company.findByPk(id);

  const province = await Province.findAll({where: {name_province: req.body.name_province}});

  if(province.length > 0){
    req.body.idprovince = province[0].idprovince;
  }

  if (companies) {
    await Company.update({ ...req.body }, { where: { idcompany: id } });
    return res.status(200).json({message:'Company updated successfully'});
  }

  return res.status(400).json({message:'Company not found'});
}

export const deleteCompanyById: RequestHandler = async (req, res, next) => {
  const id: any = req.query.id;

  const companies: Company | null = await Company.findByPk(id);

  if (companies) {
    await Company.destroy({ where: { idcompany: id } });
    return res.status(200).json({message:'Company deleted successfully'});
  }

  return res.status(400).json({message:'Company not found'});
}

export const createQualification: RequestHandler = async (req,res,next: express.NextFunction) => {

  const company = await Company.findAll({where: {name_company: req.body.name_company}});

  if(company.length > 0){
    req.body.idcompany = company[0].idcompany;
  }else{
    return res.status(400).json({ message: 'ไม่พบบริษัทนี้' });
  }

  const qualification = await Qualification.create({...req.body});                                    
  return res
      .status(200)
      .json({message:'Qualification created successfully',data:qualification});
}

export const updateQualification: RequestHandler = async (req, res, next) => {
  const id: any = req.query.id;

  const companies: Company | null = await Company.findByPk(id);

  if (companies) {
    await Qualification.update({ ...req.body }, { where: { idcompany: id } });
    return res.status(200).json({message:'Qualification updated successfully'});
  }

  return res.status(400).json({message:'Qualification not found'});
}
