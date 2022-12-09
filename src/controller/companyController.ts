import { Qualification } from './../models/qualificationModel';
import express from 'express';
import { RequestHandler } from 'express';
import { Company } from '../models/companyModel';
import { Province } from '../models/provinceModel';
const compantdata = require('../services/company');
const { Op } = require('sequelize');

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
  const search_name = req.query.search ? req.query.search : '';
  const filter_province = req.query.filter_province ? req.query.filter_province : '';
  const filter_type_company = req.query.filter_type_company ? req.query.filter_type_company : '';

  if(filter_province != '' && filter_type_company != ''){
    const countcompany = await Company.count({where: { [Op.or]: [{type_company_1: filter_type_company}, {type_company_2: filter_type_company},{type_company_3: filter_type_company}],idprovince:filter_province }});
    const company = await Company.findAll({include: [{model: Province},{model: Qualification}],offset:offset,limit:limit,where: { [Op.or]: [{type_company_1: filter_type_company}, {type_company_2: filter_type_company},{type_company_3: filter_type_company}],idprovince:filter_province }});

    return res
      .status(200)
      .json({ message: 'Company fetched successfully', data: company, count: countcompany });
  }else if(filter_province != ''){
    const countcompany = await Company.count({where: {idprovince:filter_province }});
    const company = await Company.findAll({include: [{model: Province},{model: Qualification}],offset:offset,limit:limit,where: {idprovince:filter_province }});

    return res
      .status(200)
      .json({ message: 'Company fetched successfully', data: company, count: countcompany });
  }else if(filter_type_company != ''){
    const countcompany = await Company.count({where: { [Op.or]: [{type_company_1: filter_type_company}, {type_company_2: filter_type_company},{type_company_3: filter_type_company}]}});
    const company = await Company.findAll({include: [{model: Province},{model: Qualification}],offset:offset,limit:limit,where: { [Op.or]: [{type_company_1: filter_type_company}, {type_company_2: filter_type_company},{type_company_3: filter_type_company}]}});
    
    return res
      .status(200)
      .json({ message: 'Company fetched successfully', data: company, count: countcompany });
  }
  

  const countcompany = await Company.count({where: { [Op.or]: [{name_company: {[Op.like]: `%${search_name}%`}}, {name_company_eng: {[Op.like]: `%${search_name}%`}}] }});
  const company = await Company.findAll({include: [{model: Province},{model: Qualification}],offset:offset,limit:limit,where: { [Op.or]: [{name_company: {[Op.like]: `%${search_name}%`}}, {name_company_eng: {[Op.like]: `%${search_name}%`}}] }});

  return res
    .status(200)
    .json({ message: 'Company fetched successfully', data: company, count: countcompany });
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
