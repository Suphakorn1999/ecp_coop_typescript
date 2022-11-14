import { RequestHandler } from 'express';
import express from 'express';
import { Study_group } from '../models/study_groupModel';

export const getStudy_group: RequestHandler = async (req, res) => {
    try {
        const study_group = await Study_group.findAll();
        res.json(study_group);
    } catch (error) {
        res.json(error);
    }
}

export const getStudy_groupById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const study_group = await Study_group.findByPk(id);
        if (study_group) {
            res.json(study_group);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.json(error);
    }
}

export const createStudy_group: RequestHandler = async (req, res) => {
    try {
        const { name_study_group } = req.body;
        const study_group = await Study_group.create({
            name_study_group,
        });
        if (study_group) {
            return res.json({
                message: 'Study_group created',
                study_group,
            });
        }
    } catch (error) {
        res.json(error);
    }
}

export const updateStudy_group: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_study_group } = req.body;
        const study_group = await Study_group.findByPk(id);
        if (study_group) {
            study_group.name_study_group = name_study_group;
            await study_group.save();
            res.json({
                message: 'Study_group updated',
                study_group,
            });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.json(error);
    }
}

export const deleteStudy_group: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await Study_group.destroy({
            where: { idstudy_group: id },
        });
        res.json({
            message: 'Study_group deleted',
            count: deleteRowCount,
        });
    } catch (error) {
        res.json(error);
    }
}